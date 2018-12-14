# README

Requerimientos:
Se desea mostrar en pantalla completa la hora y la temperatura y hora de las siguientes ciudades:

Santiago (CL), Zurich (CH), Auckland (NZ), Sydney (AU), Londres (UK), Georgia (USA)

Las latitudes y longitudes de cada ciudad deben ser guardadas en Redis al momento de iniciar la aplicación.

Cada request de la API debería ir a Redis, sacar las latitudes y longitudes correspondientes, y hacer las consultas necesarias al servicio de Forecast.io.

Cada request a la API tiene un 10% de chances de fallar, al momento de hacer el request deberá suceder lo siguiente:

if (Math.rand(0, 1) < 0.1) throw new Error('How unfortunate! The API Request Failed')

Esto nos simulara un fallo del 10%~, la aplicación deberá rehacer el request las veces que sea necesario para tener una respuesta correcta, cada fallo deberá guardarse en Redis dentro de un hash llamado "api.errors", la llave deberá ser el timestamp y el contenido debe ser relevante al error. El handler de error deberá capturar solamente este error y no otro con diferente clase o mensaje.

El frontend deberá actualizarse cada 10 segundos a través de web sockets. El proceso deberá actualizar redis y luego enviar el update al frontend.

La app debe ser desplegada en heroku. 

- [ ] Add google API
- [ ] Add and config Redis
- [ ] Create https://darksky.net/dev service to get data from it
- [ ] Retrive information about each city:
  -- Santiago (CL)
  -- Zurich (CH)
  -- Auckland (NZ)
  -- Sydney (AU)
  -- Londres (UK)
  -- Georgia (USA)
- [ ] Add 10%~ chance to fail each request through darksky service
- [ ] Upload to heroku