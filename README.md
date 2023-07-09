# uav_rental
Proje backend ve frontend olamk üzere iki kısıma ayrılmıştır.
backend kısmında python/django ile RestAPI standartlarına göre geliştirme yapılmıştır.
Authentication işlemi için JWT token sistemi tercih edilmiştir.
Frontend kısmı henüz tamamlanamamış fakat reactJS/bootstrap tercih edilmiştir.
Tüm API dökümanlarına aşağıdaki linkden erişilebilir.
```
https://documenter.getpostman.com/view/4986465/2s93zH2K2f
```
repo adresi aşağıdadır.
```
https://github.com/CodeS50/uav_rental
```
Postman döküman adresi içerisinde her bir API için detaylı açıklama olmasına rağmen bazı teknik detaylar:
- Kategori ve ürünler veri çekiminde auth gereksinimi yoktur. Yani üyelik gereksinimi duyulmadan ürün ve kategoriler görüntülenebilir.
- Kategori ve ürün düzenleme, silme oluşturma işlemi için superuser yetkisi gereklidir. Bunun için custom permissions oluşturulmuştur.
- Kiralama verilerine erişmek için auth ve superuser yetkisi gereklidir. Tüm kiralama işlemlerini yalnızca superuser görebilir.
- Kiralama verisi oluşturulurken stok verisine göre belirlenen tarih aralığında yeterli stok olup olmadığına bakılmaktadır. Bu sayede stok bulunmayan iha için kiralama oluşturulmaz. Sadece belirlenen tarih aralığında stok kontorlü yapılır(satınlama işlemi olmadığı için product stock sayısı düşürülmez)
- user/rentals api alanında ise auth olan kullanıcıya ait kiralama verisi listelenir ve yalnızca oluşturma işlemi yapılır. Durum verisi otomatik 0 olarak atanır. Yani müşteriler kiralamayı buradan talep etmelidir.
- docker compose yapısı kullanılmıştır. Frontend docker içerisine almaya zaman yeterli olmamıştır.
- postgre ve postgreadmin için container oluşturulmuştur.
- docker-compose.yml dosyası içerisinde gerekli tanımlar bulunmaktadır.


## Install
docker volume create sql-data
sudo docker-compose up -d --build
sudo docker-compose exec backend python3 manage.py migrate
sudo docker-compose exec backend python3 manage.py createsuperuser
