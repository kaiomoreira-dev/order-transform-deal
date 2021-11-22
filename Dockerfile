# nome do programa
FROM node

# caminho em que vai ser instalado
WORKDIR /usr/app

# copiaremos o arquivo json para o container também e passamos o caminho
COPY package.json ./

# instalaremos o npm para que ele instale a pasta node_modules depois
RUN npm install

# copiaremos tudo
COPY . .

# vamos expor a porta que vai ser acessada
EXPOSE 3333

# passaremos a linha do script configurado no packge.json dentro de um array
CMD ["npm", "run", "dev"]
