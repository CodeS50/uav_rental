/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast } from 'react-toastify';

class AlertService {
  Add(settings) {
    const nSettings = settings;
    if (nSettings.type === 'console') {
      // console.log(settings.message);
    } else if(settings.level === "success") {
        toast.success(settings.message, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: 'colored',
        });
      } else if(settings.level === "warning") {
        toast.warn(settings.message, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: 'colored',
        });
      } else if(settings.level === "danger") {
        toast.error(settings.message, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: 'colored',
        });
      }
  }

  Remove() {
  }
}

export default new AlertService();
