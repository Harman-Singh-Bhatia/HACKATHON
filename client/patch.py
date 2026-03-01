html_file = 'climate-dashboard.html'
public_html_file = 'public/climate-dashboard.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '    <!-- Carbon Investment Portfolio Section -->'
end_marker = '            </div>\n        </section>\n    </div>'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker, start_idx) + len(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Could not find portfolio section in source')
    exit(1)

portfolio_html = content[start_idx:end_idx]

with open(public_html_file, 'r', encoding='utf-8') as f:
    pub_content = f.read()

insert_marker = '    <!-- Scrolling Indicator -->'
insert_idx = pub_content.find(insert_marker)

if insert_idx == -1:
    print('Could not find insert marker')
    exit(1)

new_pub_content = pub_content[:insert_idx] + portfolio_html + '\n\n' + pub_content[insert_idx:]
new_pub_content = new_pub_content.replace('>City Grid Status<', '>Code Sphere<')

with open(public_html_file, 'w', encoding='utf-8') as f:
    f.write(new_pub_content)
    
print('Successfully patched HTML')
