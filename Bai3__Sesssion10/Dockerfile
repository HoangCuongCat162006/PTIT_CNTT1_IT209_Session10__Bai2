# ==============================================================================
# STAGE 1: BUILDER
# Muc tieu: Cai dat dependencies, bien dich/toi uu va tan dung Docker Layer Cache
# ==============================================================================
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copy rieng file khai bao phu thuoc truoc de tan dung toi da Build Cache
# Khi ma nguon thay doi ma package*.json khong doi, buoc 'npm install' se duoc lay tu cache
COPY package*.json ./

# 2. Cai dat dependencies (bao gom ca devDependencies cho build/kiem tra neu co)
RUN npm install

# 3. Copy toan bo ma nguon vao builder stage
COPY . .

# 4. Loai bo cac devDependencies khoi node_modules de chi giu lai production dependencies
RUN npm prune --production && npm cache clean --force

# ==============================================================================
# STAGE 2: RUNTIME
# Muc tieu: Tao image production sieu nhe, bao mat cao, chi chua artifact can thiet
# ==============================================================================
FROM node:18-alpine AS runtime

WORKDIR /app

# Thiet lap moi truong Production
ENV NODE_ENV=production

# Su dung user 'node' co san trong Alpine de tang cuong bao mat (tranh chay duoi quyen root)
USER node

# Chi copy nhung thanh phan thiet yeu tu Stage Builder sang Runtime
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/server.js ./

# Khai bao cong ung dung
EXPOSE 3000

# Lenh khoi chay ung dung
CMD ["node", "server.js"]
