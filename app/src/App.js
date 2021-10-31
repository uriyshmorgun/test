import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Pagination } from '@material-ui/lab';
import { orderBy, pickBy, keys, filter } from 'lodash';
import Select from '@material-ui/core/Select';
import useStyles from './styles';
import { data } from './mock';
import ButtonAppBar from './Menu'
import Button from '@material-ui/core/Button';

const modifyData = value => {
  switch (value) {
    case 'title':
      return orderBy(data, ['title']);
    case 'category':
      return orderBy(data, ['category']);
    case 'asc':
      return orderBy(data, [({ date }) => new Date(date)], 'asc');
    case 'desc':
      return orderBy(data, [({ date }) => new Date(date)], 'desc');
    case 'status':
      return orderBy(data, ['status']);
    default:
      return data;
  }
};

const findByDates = (values, period) => {
  if (period.includes('month')) {
    const date = new Date();
    const month = new Date().getMonth();
    const formatPrevMonth = new Date(date.setMonth(month - 1));

    return values.filter(v => new Date(v.date) > formatPrevMonth);
  }
  if (period.includes('week')) {
    const date = new Date();
    const formatPrevWeek = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);

    return values.filter(v => new Date(v.date) > formatPrevWeek);
  }
  if (period.includes('day')) {
    const date = new Date();
    const formatPrevDay = date.setDate(date.getDate() - 1);

    return values.filter(v => new Date(v.date) >= formatPrevDay);
  }
  return values;
};






const App = () => {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [state, setState] = useState({});
  const [stats, setStats] = useState({ new: false, process: false, complated: false });
  const [period, setPeriod] = useState({ day: false, week: false, month: false });
  const [page, setPage] = useState(1);
  const cardsPerPage = 4;
  const pagesVisited = page * cardsPerPage

  const stateNew = filter(data, {'state' : 'new'});
  const stateProcess = filter(data, {'state' : 'process'});
  const stateCompleated = filter(data, {'state' : 'complated'});

  useEffect(() => {
    const sortedData = modifyData(state.value);
    const activeStats = keys(pickBy(stats));
    const condition = sortedData.filter(values => activeStats.includes(values.state));
    const sortedDataWithConditions = condition.length ? condition : sortedData;
    const datesFilter = findByDates(sortedDataWithConditions, keys(pickBy(period)));

    setCards(datesFilter);
  }, [period, state.value, stats]);

  const handleChange = event => {
    const { name } = event.target;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  

  const Paginations = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(cards.length / cardsPerPage); i++) {

        pageNumbers.push(i);
       
    }

    return (
      
      <>
      {/* {console.log(page)} */}
        <div className={classes.cardsBlock}>
            {cards &&
              cards
              .slice((pagesVisited - cardsPerPage), pagesVisited)
              .map(({ title, date, status, category, image }) => {
                return (
                  <div key={`${title}_${category}`} className={classes.card}>
                    <div style={{ fontSize: 18 }}>{title}</div>
                    <div style={{ fontSize: 15 }}>{date}</div>
                    <div style={{ fontSize: 14 }}>{status ? 'available' : 'not available'}</div>
                    <div style={{ fontSize: 13 }}>{category}</div>
                    <div style={{ 
                      width: 150, 
                      height: 150, 
                      background: `url(${image})`, 
                      backgroundPosition: 'center', 
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover', }} />
                  </div>
                  
                );
              })}
             <Pagination count={pageNumbers.length} page={page} onChange={handleChangePage} />
            </div>
            
            </>
    )
}

  const handleChangePage = (event, value) => {
    setPage(value);
    // console.log(value)
  };

  const handleCheck = event => {
    setStats(prev => ({ ...prev, [event.target.value]: event.target.checked }));
  };

  const handleCheckPeriod = event => {
    setPeriod(prev => ({ ...prev, [event.target.value]: event.target.checked }));
  };
  return (

    <>
    <ButtonAppBar/>
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.banner} />
      </div>
      <div className={classes.topBar}>
        <div className={classes.totalCount}>{cards.length} trainings found</div>
        <div className={classes.block}>
          
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Sort by:</InputLabel>
            <Select
              native
              value={state.value}
              onChange={handleChange}
              inputProps={{
                name: 'value',
                id: 'filter-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              <option value="status">Status</option>
              <option value="category">Category</option>
              <option value="title">Title</option>
              <option value="asc">Date (newest first)</option>
              <option value="desc">Date (oldest first)</option>
            </Select>
          </FormControl>
        </div>
      </div>
      
      <div className={classes.wrapper}>
        <div className={classes.leftBar}>
          
          
          <div className={classes.progressStatus}>
          <div className={classes.progressStatusTitle}><b>Progress status</b></div>
          <div>
            <Checkbox
              value="new"
              checked={stats.new}
              onChange={handleCheck}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            New {stateNew.length}
          </div>
          
          <div>
            <Checkbox
              value="process"
              checked={stats.process}
              onChange={handleCheck}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            In process {stateProcess.length}
          </div>
          <div>
            <Checkbox
              value="complated"
              checked={stats.complated}
              onChange={handleCheck}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            Complated {stateCompleated.length}
          </div>
          </div>
          <div className={classes.period}>
            <div className={classes.periodTitle}><b>Period</b></div>
          <div>
            <Checkbox
              value="day"
              checked={period.day}
              onChange={handleCheckPeriod}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            Last day
          </div>
          <div>
            <Checkbox
              value="week"
              checked={period.week}
              onChange={handleCheckPeriod}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            Last week
          </div>
          <div>
            <Checkbox
              value="month"
              checked={period.month}
              onChange={handleCheckPeriod}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            Last month
          </div>
          </div>

          <Button variant="outlined" value="" onClick={setState} style={{fontSize: '12px', textTransform: 'capitalize'}}>Reset Filter</Button>
        </div>
        <Paginations ></Paginations> 
        
      </div>
    </div>
    </>
  );
};

export default App;