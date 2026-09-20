Add-Type -AssemblyName System.Drawing

$imgDir = Join-Path $PSScriptRoot "assets\images"
$anglesDir = Join-Path $imgDir "angles"
if (-not (Test-Path $anglesDir)) {
    New-Item -ItemType Directory -Path $anglesDir | Out-Null
}

function Crop-Image {
    param(
        [string]$SourcePath,
        [string]$DestPath,
        [float]$xPercent,
        [float]$yPercent,
        [float]$wPercent,
        [float]$hPercent
    )

    if (-not (Test-Path $SourcePath)) {
        Write-Host "Source not found: $SourcePath"
        return
    }

    $src = [System.Drawing.Bitmap]::FromFile($SourcePath)
    $srcW = $src.Width
    $srcH = $src.Height

    $cropX = [int]($srcW * $xPercent)
    $cropY = [int]($srcH * $yPercent)
    $cropW = [int]($srcW * $wPercent)
    $cropH = [int]($srcH * $hPercent)

    # Clamp bounds
    if ($cropX + $cropW -gt $srcW) { $cropW = $srcW - $cropX }
    if ($cropY + $cropH -gt $srcH) { $cropH = $srcH - $cropY }

    $rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $dest = New-Object System.Drawing.Bitmap($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)), $rect, [System.Drawing.GraphicsUnit]::Pixel)

    # Save as high quality JPEG
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

    $dest.Save($DestPath, $encoder, $encoderParams)

    $g.Dispose()
    $dest.Dispose()
    $src.Dispose()
    Write-Host "Created: $DestPath ($cropW x $cropH)"
}

# 1. Tiger Oud
Crop-Image (Join-Path $imgDir "tiger_oud.jpg") (Join-Path $anglesDir "tiger_oud_cap.jpg") 0.15 0.0 0.70 0.55
Crop-Image (Join-Path $imgDir "tiger_oud.jpg") (Join-Path $anglesDir "tiger_oud_label.jpg") 0.10 0.35 0.80 0.60
Crop-Image (Join-Path $imgDir "hero_slide_1.jpg") (Join-Path $anglesDir "tiger_oud_scene.jpg") 0.50 0.10 0.48 0.85

# 2. Nader
Crop-Image (Join-Path $imgDir "nader.jpg") (Join-Path $anglesDir "nader_cap.jpg") 0.15 0.0 0.70 0.55
Crop-Image (Join-Path $imgDir "nader.jpg") (Join-Path $anglesDir "nader_label.jpg") 0.10 0.35 0.80 0.60
Crop-Image (Join-Path $imgDir "hero_slide_1.jpg") (Join-Path $anglesDir "nader_scene.jpg") 0.10 0.15 0.45 0.80

# 3. A555
Crop-Image (Join-Path $imgDir "a555.jpg") (Join-Path $anglesDir "a555_cap.jpg") 0.15 0.0 0.70 0.55
Crop-Image (Join-Path $imgDir "a555.jpg") (Join-Path $anglesDir "a555_label.jpg") 0.10 0.35 0.80 0.60
Crop-Image (Join-Path $imgDir "hero_slide_3.jpg") (Join-Path $anglesDir "a555_scene.jpg") 0.45 0.10 0.50 0.85

# 4. Mashair
Crop-Image (Join-Path $imgDir "mashair.jpg") (Join-Path $anglesDir "mashair_cap.jpg") 0.15 0.0 0.70 0.55
Crop-Image (Join-Path $imgDir "mashair.jpg") (Join-Path $anglesDir "mashair_label.jpg") 0.10 0.35 0.80 0.60
Crop-Image (Join-Path $imgDir "hero_slide_2.jpg") (Join-Path $anglesDir "mashair_scene.jpg") 0.50 0.10 0.48 0.85

# 5. Moon Flower
Crop-Image (Join-Path $imgDir "moon_flower.jpg") (Join-Path $anglesDir "moon_flower_cap.jpg") 0.15 0.0 0.70 0.55
Crop-Image (Join-Path $imgDir "moon_flower.jpg") (Join-Path $anglesDir "moon_flower_label.jpg") 0.10 0.35 0.80 0.60
Crop-Image (Join-Path $imgDir "hero_slide_2.jpg") (Join-Path $anglesDir "moon_flower_scene.jpg") 0.05 0.15 0.50 0.80

# 6. Backhoor
Crop-Image (Join-Path $imgDir "backhoor.jpg") (Join-Path $anglesDir "backhoor_jar.jpg") 0.20 0.05 0.60 0.55
Crop-Image (Join-Path $imgDir "backhoor.jpg") (Join-Path $anglesDir "backhoor_chips.jpg") 0.10 0.40 0.80 0.55
Crop-Image (Join-Path $imgDir "hero_slide_3.jpg") (Join-Path $anglesDir "backhoor_scene.jpg") 0.05 0.10 0.50 0.85

Write-Host "All authentic product angle crops generated successfully."
