Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'sodium-potassium-salt-substitute-blood-pressure-label-2026.png'
    Output = 'omega3-supplement-atrial-fibrillation-risk-check-2026.png'
    Title = '오메가3 안전'
    Subtitle = '심방세동 · 고용량 · 복용약 확인'
    Chips = @('오메가3', '심방세동', '상담')
  },
  @{
    Source = 'resistant-starch-gut-microbiome-polyphenol-phlorotannin-2026.png'
    Output = 'young-colorectal-cancer-blood-stool-screening-symptoms-2026.png'
    Title = '젊은 대장암 신호'
    Subtitle = '혈변 · 배변습관 · 45세 전 상담'
    Chips = @('혈변', '대장암', '검진')
  },
  @{
    Source = 'microplastics-oxidative-stress-seaweed-polyphenol-2026.png'
    Output = 'pfas-drinking-water-forever-chemicals-home-check-2026.png'
    Title = 'PFAS 물 이슈'
    Subtitle = '수돗물 · 정수필터 · 노출 기록'
    Chips = @('PFAS', '물', '노출')
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
$titleFont = New-Object System.Drawing.Font($fontFamily, 44, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font($fontFamily, 26, [System.Drawing.FontStyle]::Regular)
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

  Draw-RoundedRect $g (New-Brush 252 255 255 255) 72 66 704 500 28
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(72, 36, 105, 83), 2)
  $g.DrawLine($pen, 100, 148, 260, 148)
  $pen.Dispose()

  $g.DrawString('PHLOROTANNIN HEALTH INSIGHT', $brandFont, (New-Brush 255 39 107 83), 92, 102)
  $g.DrawString($item.Title, $titleFont, (New-Brush 255 12 36 31), 92, 188)
  $g.DrawString($item.Subtitle, $subtitleFont, (New-Brush 255 45 65 58), 96, 300)

  $x = 96
  foreach ($chip in $item.Chips) {
    $size = $g.MeasureString($chip, $chipFont)
    $w = [Math]::Ceiling($size.Width) + 36
    Draw-RoundedRect $g (New-Brush 250 255 255 255) $x 408 $w 48 24
    $chipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(180, 39, 107, 83), 2)
    $g.DrawArc($chipPen, $x, 408, 48, 48, 90, 180)
    $chipPen.Dispose()
    $g.DrawString($chip, $chipFont, (New-Brush 255 21 88 67), ($x + 18), 419)
    $x += $w + 16
  }

  Draw-RoundedRect $g (New-Brush 246 255 255 255) 828 422 300 86 24
  $g.DrawString('기록  |  상담', $subtitleFont, (New-Brush 255 38 113 87), 906, 448)
  $g.DrawString('근거 기반 건강정보 · 생활 기록 중심', $captionFont, (New-Brush 255 87 104 99), 96, 528)

  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "created $outputPath"
}

