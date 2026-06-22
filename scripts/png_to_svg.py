import math
from PIL import Image

def point_line_distance(p, w1, w2):
    x0, y0 = p
    x1, y1 = w1
    x2, y2 = w2
    numerator = abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1)
    denominator = math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
    if denominator == 0:
        return math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2)
    return numerator / denominator

def rdp(points, epsilon):
    if len(points) < 3:
        return points
        
    dmax = 0
    index = 0
    end = len(points) - 1
    for i in range(1, end):
        d = point_line_distance(points[i], points[0], points[end])
        if d > dmax:
            index = i
            dmax = d
            
    if dmax > epsilon:
        results1 = rdp(points[:index+1], epsilon)
        results2 = rdp(points[index:], epsilon)
        return results1[:-1] + results2
    else:
        return [points[0], points[end]]

def convert_png_to_svg():
    img_path = 'public/images/logo_transparent.png'
    img = Image.open(img_path).convert('RGBA')
    width, height = img.size
    pixels = img.load()
    
    # Create mask of opaque pixels (alpha > 40)
    mask = []
    for y in range(height):
        row = []
        for x in range(width):
            alpha = pixels[x, y][3]
            row.append(alpha > 40)
        mask.append(row)
        
    contours = []
    dirs = [(0, -1), (1, 0), (0, 1), (-1, 0)] # Up, Right, Down, Left
    
    for sy in range(height):
        for sx in range(width):
            if mask[sy][sx]:
                # Trace boundary
                p = (sx, sy)
                start = p
                contour = [start]
                dir_idx = 0 # Face up initially
                
                max_steps = width * height
                steps = 0
                while steps < max_steps:
                    steps += 1
                    dir_idx = (dir_idx - 1) % 4 # Turn left
                    found_next = False
                    
                    for _ in range(4):
                        dx, dy = dirs[dir_idx]
                        nx, ny = p[0] + dx, p[1] + dy
                        if 0 <= nx < width and 0 <= ny < height and mask[ny][nx]:
                            p = (nx, ny)
                            found_next = True
                            break
                        dir_idx = (dir_idx + 1) % 4 # Turn right
                        
                    if not found_next or p == start:
                        break
                    contour.append(p)
                
                if len(contour) >= 3:
                    # Simplify the contour using RDP to smooth out pixelated steps
                    simplified = rdp(contour, 1.2)
                    if len(simplified) >= 3:
                        contours.append(simplified)
                
                # Flood fill the shape to clear it from the mask
                queue = [start]
                visited = {start}
                while queue:
                    cx, cy = queue.pop(0)
                    if mask[cy][cx]:
                        mask[cy][cx] = False
                        for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                            nx, ny = cx + dx, cy + dy
                            if 0 <= nx < width and 0 <= ny < height and mask[ny][nx] and (nx, ny) not in visited:
                                visited.add((nx, ny))
                                queue.append((nx, ny))
                                
    # SVG coordinates centered around (0,0)
    half_w = width / 2
    half_h = height / 2
    
    svg_content = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-half_w} {-half_h} {width} {height}" width="{width}" height="{height}">'
    ]
    
    for c in contours:
        path_data = []
        for i, pt in enumerate(c):
            x = pt[0] - half_w
            y = pt[1] - half_h
            if i == 0:
                path_data.append(f"M {x:.2f} {y:.2f}")
            else:
                path_data.append(f"L {x:.2f} {y:.2f}")
        path_data.append("Z")
        
        path_str = " ".join(path_data)
        svg_content.append(f'  <path d="{path_str}" fill="#C47A46" />')
        
    svg_content.append('</svg>')
    
    with open('public/images/logo.svg', 'w') as f:
        f.write("\n".join(svg_content))
        
    print(f"Successfully converted PNG to SVG with {len(contours)} contours using pure Python.")

if __name__ == '__main__':
    convert_png_to_svg()
