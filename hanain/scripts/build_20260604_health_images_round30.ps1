Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'summer-scalp-sunburn-thinning-hair-uv-record-2026.png'
    Output = 'summer-swimming-scalp-itch-chlorine-saltwater-record-2026.png'
    Kicker = 'SUMMER SWIMMING SCALP'
    Title = @('수영 후 두피', '가려움 기록')
    Subtitle = '염소·소금·발진 시간을 먼저 확인'
    Chips = @('수영장', '두피', '모발')
    Accent = [System.Drawing.Color]::FromArgb(22, 112, 128)
  },
  @{
    Source = 'mens-health-month-blood-pressure-waist-snoring-screening-record-2026.png'
    Output = 'abdominal-aortic-aneurysm-men-smoking-screening-record-2026.png'
    Kicker = 'MEN SCREENING CHECK'
    Title = @('흡연력 있는 남성', '검진 질문')
    Subtitle = '복부대동맥류 선별검사 기록'
    Chips = @('흡연력', '혈압', '초음파')
    Accent = [System.Drawing.Color]::FromArgb(41, 87, 126)
  },
  @{
    Source = 'summer-uti-women-hydration-urination-symptom-record-2026.png'
    Output = 'hpv-self-collection-cervical-screening-record-2026.png'
    Kicker = 'HPV SCREENING RECORD'
    Title = @('HPV 자가채취', '검진 이력 기록')
    Subtitle = 'Pap·HPV 검사 날짜부터 정리'
    Chips = @('HPV검사', '자가채취', '여성건강')
    Accent = [System.Drawing.Color]::FromArgb(139, 76, 119)
  }
)

function New-Brush([System.Drawing.Color]$color) {
  return New-Object System.Drawing.SolidBrush($color)
}

function New-ArgbBrush([int]$a, [int]$r, [int]$g, [int]$b) {
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

function Draw-Chip($graphics, [float]$x, [float]$y, [string]$text, $font, [System.Drawing.Color]$accent) {
  $size = $graphics.MeasureString($text, $font)
  $w = [Math]::Ceiling($size.Width) + 38
  $h = 46
  Draw-RoundedRect $graphics (New-ArgbBrush 230 255 255 255) $x $y $w $h 22
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, $accent.R, $accent.G, $accent.B), 2)
  $graphics.DrawArc($pen, $x, $y, 44, 44, 90, 180)
  $pen.Dispose()
  $graphics.DrawString($text, $font, (New-ArgbBrush 255 16 45 39), ($x + 17), ($y + 9))
  return $x + $w + 12
}

$fontFamily = 'Malgun Gothic'
$kickerFont = New-Object System.Drawing.Font($fontFamily, 20, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font($fontFamily, 48, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font($fontFamily, 25, [System.Drawing.FontStyle]::Regular)
$chipFont = New-Object System.Drawing.Font($fontFamily, 21, [System.Drawing.FontStyle]::Bold)
$smallFont = New-Object System.Drawing.Font($fontFamily, 18, [System.Drawing.FontStyle]::Regular)
$badgeFont = New-Object System.Drawing.Font($fontFamily, 24, [System.Drawing.FontStyle]::Bold)

foreach ($item in $items) {
  $sourcePath = Join-Path $outDir $item.Source
  $outputPath = Join-Path $outDir $item.Output
  $src = [System.Drawing.Image]::FromFile($sourcePath)
  $bmp = New-Object System.Drawing.Bitmap(1200, 630)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $g.DrawImage($src, 0, 0, 1200, 630)
  $g.FillRectangle((New-ArgbBrush 136 255 252 246), 0, 0, 1200, 630)
  $g.FillRectangle((New-ArgbBrush 212 255 255 255), 0, 0, 780, 630)
  $g.FillEllipse((New-ArgbBrush 42 $item.Accent.R $item.Accent.G $item.Accent.B), 820, -150, 520, 520)

  Draw-RoundedRect $g (New-ArgbBrush 240 255 255 255) 58 62 704 500 31
  $outline = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(232, 222, 228, 222), 2)
  $g.DrawRectangle($outline, 60, 64, 700, 496)
  $outline.Dispose()
  $g.FillRectangle((New-Brush $item.Accent), 92, 130, 150, 6)

  $g.DrawString($item.Kicker, $kickerFont, (New-Brush $item.Accent), 92, 88)
  $y = 168
  foreach ($line in $item.Title) {
    $g.DrawString($line, $titleFont, (New-ArgbBrush 255 12 35 30), 92, $y)
    $y += 61
  }
  $g.DrawString($item.Subtitle, $subtitleFont, (New-ArgbBrush 255 62 76 70), 94, ($y + 18))

  $chipX = 92
  foreach ($chip in $item.Chips) {
    $chipX = Draw-Chip $g $chipX 430 $chip $chipFont $item.Accent
  }

  $g.DrawString('공식 자료 기반 · 기록 중심 건강정보', $smallFont, (New-ArgbBrush 255 86 103 97), 94, 516)

  Draw-RoundedRect $g (New-ArgbBrush 184 255 255 255) 884 420 234 86 25
  $g.DrawString('기록', $badgeFont, (New-Brush $item.Accent), 913, 445)
  $divider = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(203, 216, 210), 2)
  $g.DrawLine($divider, 989, 442, 989, 480)
  $divider.Dispose()
  $g.DrawString('상담', $badgeFont, (New-Brush $item.Accent), 1022, 445)

  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "created $outputPath"
}

