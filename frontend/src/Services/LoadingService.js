import AuthStore from '../Stores/AuthStore';

class LoadingService {
  start() {
    const key = `_${Math.random().toString(36).substr(2, 9)}`;
    this.key = key;
    AuthStore.setLoading(this.key, true);
    return this;
  }

  end() {
    if (this.key) {
      AuthStore.setLoading(this.key, false);
    }
  }
}

export default LoadingService;
