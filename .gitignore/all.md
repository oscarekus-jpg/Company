For teamwork, the safer routine is usually:

git pull

(first, before editing)

then later:

git add . && git commit -m "Your message" && git push

because pulling after you already changed files can create conflicts.