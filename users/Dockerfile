FROM node

WORKDIR /app

COPY package.json .

COPY prisma .

RUN npm install

RUN npx prisma generate

COPY . .

CMD ["npm", "start"]