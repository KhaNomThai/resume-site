#!/bin/bash
# PostToolUse: แก้ src/data.ts เมื่อไร สร้าง PDF CV ใหม่ทันที เว็บกับ CV จะได้ไม่หลุดกัน
# exit 2 = ส่ง stderr กลับไปให้ Claude เห็น (เช่น Chrome หายหรือ data.ts มี error) แทนที่จะเงียบไป
file=$(jq -r '.tool_input.file_path // empty')
[[ "$file" == */src/data.ts ]] || exit 0

cd "$CLAUDE_PROJECT_DIR" || exit 0
if ! out=$(npm run cv 2>&1); then
  echo "npm run cv ล้มเหลวหลังแก้ src/data.ts:" >&2
  echo "$out" | tail -20 >&2
  exit 2
fi

cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"hook สร้าง PDF CV ใหม่จาก src/data.ts แล้ว ถ้าแก้ profile (firstName/lastName/focus/role/school/availability/siteUrl) หรือ 3 อันแรกของ highlights ให้รัน npm run og ด้วย เพราะรูป og-image ใช้ค่าเหล่านี้ ถ้าเนื้อหา CV ไม่ได้เปลี่ยน PDF จะต่างแค่วันที่ใน metadata ให้ git checkout ไฟล์คืนแทนการ commit"}}
JSON
