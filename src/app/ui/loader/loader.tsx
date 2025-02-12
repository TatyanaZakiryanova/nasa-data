import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer} data-testid="loader">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
