# ms-grpc
Para executar o código: 
```sh
docker-compose up -d
```
Depois de alguns segundos/minutos os serviços vão estar disponíveis, através do Kong Gateway, em http://localhost:8000

## Endpoints

### Serviço para farmácia

POST http://localhost:8000/pharmacy-service/pharmacies - Criar farmácia
```ts
Body: {
  "logo": string,
  "name": string,
  "cnpj": string,
  "address": string,
  "openingHours": string,
  "responsible": string,
  "phone": string
}
*Obs: Todos os campos são obrigatórios
```

PATCH http://localhost:8000/pharmacy-service/pharmacies/affiliation/:pharmacyId - Afiliar farmácia
```ts
Body: {
  "affiliatedPharmacyId": "6c25bb40-d066-4157-9a24-ff683bb639c0"
}
```

PUT http://localhost:8000/pharmacy-service/pharmacies/:pharmacyId - Aatualizar farmácia
```ts
Body: {
  "logo": string,
  "name": string,
  "cnpj": string,
  "address": string,
  "openingHours": string,
  "responsible": string,
  "phone": string
}
*Obs: Todos os campos são opcionais
```

DELETE http://localhost:8000/pharmacy-service/pharmacies/:pharmacyId - Deletar farmácia

GET http://localhost:8000/pharmacy-service/pharmacies - Listar farmácias

GET http://localhost:8000/pharmacy-service/pharmacies/:pharmacyId - Listar farmácia específica

### Serviço para produto

POST http://localhost:8000/product-service/products - Criar produto
```ts
{
  "thumbnail": string,
  "name": string,
  "price": number,
  "ingredients": string,
  "availability": number,
  "volume": number,
  "pharmacyId": string
}
*Obs: Todos os campos são obrigatórios
```

PUT http://localhost:8000/product-service/products/:productId - Atualizar produto
```ts
{
  "thumbnail": string,
  "name": string,
  "price": number,
  "ingredients": string,
  "availability": number,
  "volume": number,
  "pharmacyId": string
}
*Obs: Todos os campos são opcionais
```

POST http://localhost:8000/product-service/products/:productId/:pharmacyId - Clonar produto para alguma farmácia

DELETE http://localhost:8000/product-service/products/:productId - Deletar produto

GET http://localhost:8000/product-service/products - Listar produtos

GET http://localhost:8000/product-service/products/:productId - Listar produto específico
