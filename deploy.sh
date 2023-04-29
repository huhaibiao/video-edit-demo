#!/usr/bin/env sh
###
 # @Author: huhaibiao huhaibiao@do-global.com
 # @Date: 2023-04-01 23:32:14
 # @Description: 
### 

# 当发生错误时中止脚本
set -e

# 构建
pnpm build

# cd 到构建输出的目录下
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://huhaibiao.github.io/ai-chat
git push -f git@github.com:huhaibiao/video-edit.git master:deploy

cd -