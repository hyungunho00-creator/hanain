Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'ultra-processed-food-heart-risk-blood-sugar-label-2026.png'
    Output = 'sodium-potassium-salt-substitute-blood-pressure-label-2026.png'
    Title = '나트륨 줄이기'
    Subtitle = '혈압 · 칼륨 소금 · 라벨 기록'
    Chips = @('저염', '혈압', '칼륨')
  },
  @{
    Source = 'glp1-muscle-loss-protein-resistance-training-2026.png'
    Output = 'creatine-resistance-training-healthy-aging-sarcopenia-2026.png'
    Title = '크레아틴과 근력'
    Subtitle = '건강노화 · 근감소 예방 기록'
    Chips = @('크레아틴', '근력운동', '노화')
  },
  @{
    Source = 'fiber-gut-microbiome-polyphenol-phlorotannin-2026.png'
    Output = 'resistant-starch-gut-microbiome-polyphenol-phlorotannin-2026.png'
    Title = '장내미생물'
    Subtitle = '저항성전분 · 식이섬유 · 폴리페놀'
    Chips = @('장건강', '식이섬유', '폴리페놀')
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

