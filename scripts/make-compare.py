from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"C:\Users\10245\dsh-blue-whale")
OUT = ROOT / "docs"
OUT.mkdir(exist_ok=True)

BEFORE = Path(
    r"C:\Users\10245\.grok\sessions\C%3A%5CUsers%5C10245\01a0012d-14d4-7e23-8b4c-637017f72286\assets\image-d30dd515-27b2-434e-92e3-30be000dd71c.jpg"
)
AFTER = Path(
    r"C:\Users\10245\.grok\sessions\C%3A%5CUsers%5C10245\01a0012d-14d4-7e23-8b4c-637017f72286\images\1.jpg"
)

ACCENT = (77, 107, 254)
INK = (23, 23, 26)
MUTED = (110, 114, 122)
LINE = (228, 230, 235)
PAPER = (255, 255, 255)
BAND = (247, 248, 250)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "msyhbd.ttc" if bold else "msyh.ttc"
    return ImageFont.truetype(rf"C:\Windows\Fonts\{name}", size)


def fit(im: Image.Image, width: int) -> Image.Image:
    if im.mode != "RGB":
        im = im.convert("RGB")
    ratio = width / im.width
    return im.resize((width, max(1, round(im.height * ratio))), Image.Resampling.LANCZOS)


def crop_after_chrome(im: Image.Image) -> Image.Image:
    # Drop browser tabs + address bar only. Keep the DSH logo row.
    return im.crop((0, 92, im.width, im.height))


def panel(im: Image.Image, title: str, width: int) -> Image.Image:
    shot = fit(im, width)
    pad = 16
    label_h = 52
    canvas = Image.new("RGB", (shot.width + pad * 2, shot.height + pad * 2 + label_h), PAPER)
    canvas.paste(shot, (pad, pad + label_h))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        (0, 0, canvas.width - 1, canvas.height - 1),
        radius=18,
        outline=LINE,
        width=1,
    )
    draw.rectangle((1, 1, canvas.width - 2, label_h), fill=BAND)
    draw.ellipse((22, 18, 36, 32), fill=ACCENT if "后" in title else (40, 40, 44))
    draw.text((48, 14), title, font=font(20, True), fill=INK)
    return canvas


def stack(left: Image.Image, right: Image.Image, heading: str, sub: str) -> Image.Image:
    gap = 24
    header = 108
    side = 36
    width = side * 2 + left.width + gap + right.width
    height = header + max(left.height, right.height) + 36
    canvas = Image.new("RGB", (width, height), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.text((side, 28), heading, font=font(30, True), fill=INK)
    draw.text((side, 70), sub, font=font(16), fill=MUTED)
    y = header
    canvas.paste(left, (side, y))
    canvas.paste(right, (side + left.width + gap, y))
    return canvas


before = Image.open(BEFORE)
after = crop_after_chrome(Image.open(AFTER))

home = stack(
    panel(before, "使用前 · 官方黑鲸", 860),
    panel(after, "使用后 · 官方蓝鲸", 860),
    "dsh-blue-whale 首页对比",
    "装上插件后，欢迎页鲸标与品牌色换成 DeepSeek 官方蓝 #4D6BFE",
)
home.save(OUT / "compare-home.png", optimize=True)

# Brand close-up: left sidebar wordmark + hero fish band.
bw, bh = before.size
aw, ah = after.size
before_brand = before.crop((0, 0, 520, 120))
after_brand = after.crop((0, 0, 420, 100))
before_hero = before.crop((520, 400, 1480, 700))
after_hero = after.crop((300, 250, 1050, 480))


def stack_v(top: Image.Image, bottom: Image.Image, title: str) -> Image.Image:
    w = 820
    t = fit(top, w)
    b = fit(bottom, w)
    label_h = 48
    gap = 12
    canvas = Image.new("RGB", (w + 32, label_h + t.height + gap + b.height + 32), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((0, 0, canvas.width - 1, canvas.height - 1), radius=18, outline=LINE, width=1)
    draw.rectangle((1, 1, canvas.width - 2, label_h), fill=BAND)
    draw.ellipse((20, 16, 34, 30), fill=ACCENT if "后" in title else (40, 40, 44))
    draw.text((44, 12), title, font=font(20, True), fill=INK)
    canvas.paste(t, (16, label_h + 10))
    canvas.paste(b, (16, label_h + 10 + t.height + gap))
    return canvas


brand = stack(
    stack_v(before_brand, before_hero, "使用前 · 官方黑鲸"),
    stack_v(after_brand, after_hero, "使用后 · 官方蓝鲸"),
    "dsh-blue-whale 品牌对比",
    "侧栏 deepseek 字标 + 欢迎页鲸，一并换成官方蓝",
)
brand.save(OUT / "compare-brand.png", optimize=True)
print(home.size, "->", OUT / "compare-home.png")
print(brand.size, "->", OUT / "compare-brand.png")
