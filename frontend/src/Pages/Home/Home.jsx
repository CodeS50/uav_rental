import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import LoadingService from '../../Services/LoadingService';
import APIV3Service from '../../Services/APIV3Service';
import AlertService from '../../Services/AlertService';

const Home = inject('AuthStore')(
  observer(({ AuthStore }) => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
      // if(data.id.value !== '') {
      // }
      (async () => {
        const loading = new LoadingService().start();
        try {
          const response = await APIV3Service.getByParam('/user/rentals', {});
          setRentals(response.body);

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
      <>
        <h1 className="mt-4 mb-4 fw-bolder">{`Hoşgeldiniz ${AuthStore.getUser().first_name} ${AuthStore.getUser().last_name}`}</h1>
        <div className="row">
          <div className="col-md-12">
            {
              rentals.length < 1 && (
                <h1>Daha önce kiraladığınız iha bulunamadı</h1>
              )
            }

            {
              rentals.map((rental) => (
                <div key={rental.id}>
                  rental list itemleri burada
                </div>
              ))
            }
          </div>
        </div>
      </>
    );
  }),
);
export default Home;
