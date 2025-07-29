FROM node:20-alpine AS build
WORKDIR /app

COPY InvoiceManagement.UI/package*.json ./
RUN npm install

COPY InvoiceManagement.UI/. ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/invoice-management.ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
