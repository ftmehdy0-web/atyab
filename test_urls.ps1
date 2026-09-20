$urls = @(
  "http://127.0.0.1:8080/index.html",
  "http://127.0.0.1:8080/product.html",
  "http://127.0.0.1:8080/product.html?id=atyab-tiger-oud",
  "http://127.0.0.1:8080/product.html?id=atyab-nader",
  "http://127.0.0.1:8080/product-tiger-oud.html",
  "http://127.0.0.1:8080/product-nader.html",
  "http://127.0.0.1:8080/product-a555.html",
  "http://127.0.0.1:8080/product-mashair.html",
  "http://127.0.0.1:8080/product-moon-flower.html",
  "http://127.0.0.1:8080/product-backhoor.html",
  "http://127.0.0.1:8080/css/style.css",
  "http://127.0.0.1:8080/js/translations.js",
  "http://127.0.0.1:8080/js/products.js",
  "http://127.0.0.1:8080/js/app.js",
  "http://127.0.0.1:8080/js/product-page.js",
  "http://127.0.0.1:8080/assets/images/tiger_oud.jpg",
  "http://127.0.0.1:8080/assets/images/angles/tiger_oud_cap.jpg",
  "http://127.0.0.1:8080/assets/images/angles/tiger_oud_label.jpg",
  "http://127.0.0.1:8080/assets/images/angles/tiger_oud_scene.jpg",
  "http://127.0.0.1:8080/assets/images/angles/nader_cap.jpg",
  "http://127.0.0.1:8080/assets/images/angles/a555_cap.jpg",
  "http://127.0.0.1:8080/assets/images/angles/mashair_cap.jpg",
  "http://127.0.0.1:8080/assets/images/angles/moon_flower_cap.jpg",
  "http://127.0.0.1:8080/assets/images/angles/backhoor_jar.jpg"
)

$passed = 0
$failed = 0

foreach ($url in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5
        Write-Host "$url -> $($res.StatusCode) OK ($($res.RawContentLength) bytes)"
        $passed++
    } catch {
        Write-Host "$url -> FAILED: $_"
        $failed++
    }
}

Write-Host "--- TEST SUMMARY ---"
Write-Host "Passed: $passed / Failed: $failed"
