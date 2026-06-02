Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'coffee-gut-brain-axis-polyphenol-microbiome-2026.png'
    Output = 'hearing-loss-dementia-risk-hearing-aid-record-2026.png'
    Title = '난청과 뇌건강'
    Subtitle = '청력검사 · 보청기 · 소통 기록'
    Chips = @('난청', '인지', '기록')
  },
  @{
    Source = 'sleep-regularity-circadian-heart-risk-record-2026.png'
    Output = 'screen-time-sleep-anxiety-digital-behavior-record-2026.png'
    Title = '스크린타임 기록'
    Subtitle = '수면 · 불안 · 밤 사용 경계'
    Chips = @('수면', '불안', '디지털')
  },
  @{
    Source = 'vitamin-d-sun-exposure-sunscreen-skin-balance-2026.png'
    Output = 'sunscreen-vitamin-d-uv-index-myth-check-2026.png'
    Title = '자외선차단 확인'
    Subtitle = '비타민D · UV 지수 · 피부보호'
    Chips = @('SPF', 'UV', '피부')
  }
)

function New-Brush([int]$a, [int]$r, [int]$g, [int]$b) {
  return New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($a, $r, $g, $b))
}

function Draw-RoundedRect($graphics, $brush, [float]$x, [float]$y, [float]$w, [float]$h, [float]$radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $radius * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

$fontFamily = 'Malgun Gothic'
$brandFont = New-Object System.Drawing.Font($fontFamily, 20, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font($fontFamily, 43, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font($fontFamily, 25, [System.Drawing.FontStyle]::Regular)
$chipFont = New-Object System.Drawing.Font($fontFamily, 18, [System.Drawing.FontStyle]::Bold)
$captionFont = New-Object System.Drawing.Font($fontFamily, 16, [System.Drawing.FontStyle]::Regular)

foreach ($item in $items) {
  $sourcePath = Join-Path $outDir $item.Source
  $outputPath = Join-Path $outDir $item.Output
  $src = [System.Drawing.Image]::FromFile($sourcePath)
  $bmp = New-Object System.Drawing.Bitmap(1200, 630)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.DrawImage($src, 0, 0, 1200, 630)

  Draw-RoundedRect $g (New-Brush 253 255 255 255) 70 66 730 502 28
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(82, 32, 102, 82), 2)
  $g.DrawLine($pen, 100, 148, 260, 148)
  $pen.Dispose()

  $g.DrawString('PHLOROTANNIN CATEGORY UPDATE', $brandFont, (New-Brush 255 35 103 82), 96, 102)
  $g.DrawString($item.Title, $titleFont, (New-Brush 255 9 35 30), 96, 194)
  $g.DrawString($item.Subtitle, $subtitleFont, (New-Brush 255 47 64 58), 100, 306)

  $x = 100
  foreach ($chip in $item.Chips) {
    $size = $g.MeasureString($chip, $chipFont)
    $w = [Math]::Ceiling($size.Width) + 38
    Draw-RoundedRect $g (New-Brush 250 255 255 255) $x 412 $w 48 24
    $chipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(190, 35, 103, 82), 2)
    $g.DrawArc($chipPen, $x, 412, 48, 48, 90, 180)
    $chipPen.Dispose()
    $g.DrawString($chip, $chipFont, (New-Brush 255 20 88 67), ($x + 18), 423)
    $x += $w + 16
  }

  Draw-RoundedRect $g (New-Brush 247 255 255 255) 832 420 300 88 24
  $g.DrawString('기록  |  상담', $subtitleFont, (New-Brush 255 38 113 87), 914, 448)
  $g.DrawString('최신 자료 기반 · 카테고리 순환 보강', $captionFont, (New-Brush 255 82 101 96), 100, 530)

  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "created $outputPath"
}

