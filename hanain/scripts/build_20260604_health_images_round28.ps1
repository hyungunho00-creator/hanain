Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'norovirus-handwashing-bleach-hydration-outbreak-record-2026.png'
    Output = 'world-food-safety-day-foodborne-illness-home-record-2026.png'
    Kicker = 'WORLD FOOD SAFETY DAY 2026'
    Title = @('여름 식중독은', '보관 기록이 먼저')
    Subtitle = '음식·시간·탈수 신호를 같이 남기는 식품안전 루틴'
    Chips = @('식품안전', '식중독', '장 건강')
    Accent = [System.Drawing.Color]::FromArgb(31, 124, 92)
  },
  @{
    Source = 'indoor-co2-ventilation-hepa-respiratory-virus-record-2026.png'
    Output = 'monsoon-mold-dampness-asthma-allergy-home-record-2026.png'
    Kicker = 'MONSOON INDOOR AIR'
    Title = @('장마철 곰팡이와', '기침 기록')
    Subtitle = '습도·물샘·야간 기침을 함께 보는 호흡기 체크'
    Chips = @('곰팡이', '습도', '천식')
    Accent = [System.Drawing.Color]::FromArgb(29, 112, 124)
  },
  @{
    Source = 'heat-health-action-plan-hydration-blood-pressure-2026.png'
    Output = 'extreme-heat-medication-plan-older-adults-hydration-record-2026.png'
    Kicker = 'EXTREME HEAT ACTION PLAN'
    Title = @('폭염 전 약물·냉방', '계획을 세우세요')
    Subtitle = '고령자와 혈압약 복용자가 먼저 확인할 여름 기록'
    Chips = @('폭염', '약물', '심혈관')
    Accent = [System.Drawing.Color]::FromArgb(155, 94, 41)
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
  Draw-RoundedRect $graphics (New-ArgbBrush 226 255 255 255) $x $y $w $h 22
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
  $g.FillRectangle((New-ArgbBrush 128 255 252 244), 0, 0, 1200, 630)
  $g.FillRectangle((New-ArgbBrush 205 255 255 255), 0, 0, 775, 630)
  $g.FillEllipse((New-ArgbBrush 45 $item.Accent.R $item.Accent.G $item.Accent.B), 820, -160, 520, 520)

  Draw-RoundedRect $g (New-ArgbBrush 236 255 255 255) 58 62 698 496 31
  $outline = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(235, 223, 231, 225), 2)
  $g.DrawRectangle($outline, 60, 64, 694, 492)
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

  $g.DrawString('근거 기반 건강정보 · 과장 표현 없이 기록 중심', $smallFont, (New-ArgbBrush 255 86 103 97), 94, 516)

  Draw-RoundedRect $g (New-ArgbBrush 182 255 255 255) 884 420 234 86 25
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

