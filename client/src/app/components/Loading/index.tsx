import styles from './style.module.scss';
const Loading = ({ message }: {
  message?: string
}) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      {
        message && <p className={styles.loaderText}>{message}</p>
      }
    </div>
  );
};

export default Loading;