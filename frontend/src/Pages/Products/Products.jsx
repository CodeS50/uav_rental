import React, { useEffect, useState } from 'react';
import LoadingService from "../../Services/LoadingService";
import APIV3Service from "../../Services/APIV3Service";
import AlertService from "../../Services/AlertService";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // if(data.id.value !== '') {
    // }
    (async () => {
      const loading = new LoadingService().start();
      try {
        const response = await APIV3Service.getByParam('/products', {});
        setProducts(response.body);

        loading.end();
      } catch (error) {
        const { body } = error.response;
        AlertService.Add({
          message: body.message,
          level: 'danger',
          autoDismiss: true,
        });
        loading.end();
      }
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-md-9">
        <h1 className="mt-4 mb-4 fw-bolder">Ürünler</h1>
        {products.length < 1 && <h1>kiralanabilecek iha bulunamadı</h1>}

        {products.map((product) => (
          <div key={product.id}>rental list itemleri burada</div>
        ))}
      </div>
      <div className="col-md-3">
        <h1 className="mt-4 mb-4 fw-bolder">Kategoriler</h1>
      </div>
    </div>
  );
};

Products.propTypes = {};

export default Products;
