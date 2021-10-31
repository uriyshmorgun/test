import { createStyles, makeStyles } from '@material-ui/core/styles';


export default makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '75%',
      margin: 'auto',
    },
    header: {
      // borderTop: '1px solid black',
      height: 300,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner: {
      width: '100%',
      height: 200,
      background: 'linear-gradient(90deg, rgba(161,135,172,1) 0%, rgba(217,201,217,1) 100%);',
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%',
      marginBottom: '50px',
    },
    leftBar: {
      width: '20%',
      
      display: 'flex',
      flexDirection: 'column',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
    },
    block: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    card: {
      width: '100%',
      borderBottom: '1px solid #ccc',
      padding: 5,
      margin: 10,
    },
    totalCount: {
      marginBottom: 20,
      marginTop: 20,
    },
    cardsBlock: {
      display: 'flex',
      width: '70%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    progressStatus: {
      marginBottom: '20px',
      borderBottom: '1px solid #444',
    },
    period: {
      marginBottom: '20px',
      borderBottom: '1px solid #444',
    }
  }),
);