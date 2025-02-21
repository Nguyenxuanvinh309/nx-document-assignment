import { Button } from "@mantine/core";
import styles from './style.module.scss';

const Component = ({
  ...props
}) => {
  return (
    <Button 
      className={styles.button} 
      {...props}
    >
      {props?.children}
    </Button>
  )
};
export default Component;