param([int]$Port = 8080)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "ATYAB Perfumes fast cached server running on http://127.0.0.1:$Port/"

$cache = @{}
$mimes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".webp" = "image/webp"
    ".svg"  = "image/svg+xml"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath
        if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
            $path = "/index.html"
        }

        $cleanPath = $path.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
        $fullPath = Join-Path $PSScriptRoot $cleanPath

        if (Test-Path $fullPath -PathType Leaf) {
            $bytes = [IO.File]::ReadAllBytes($fullPath)
        } else {
            $bytes = $null
        }

        if ($bytes -ne $null) {
            $ext = [IO.Path]::GetExtension($fullPath).ToLower()
            $mime = $mimes[$ext]
            if (-not $mime) { $mime = "application/octet-stream" }
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length

            $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $err = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $err.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($err, 0, $err.Length)
            }
        }
        $response.Close()
    } catch {
        # continue on client disconnect
    }
}
