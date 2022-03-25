const fs = require('fs');
const dataPath = 'src/Data/customers.json';

class CustomerController {

  static getData () {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
  }

  static getSearchData (data, query) {
    const searchFields = ['first_name', 'last_name']
    return data.filter(customer => {
      for (let key in searchFields) {
        if (customer[searchFields[key]].toLowerCase().includes(query.toLowerCase()) ) {
          return true
        }
      }
      return false
    });
  }
    
  static getFilteredData(data, filters) {
    return data.filter(customer => {
      let isValid = true;
      for (let key in filters) {
        isValid = isValid &&( customer[key].toLowerCase() == filters[key].toLowerCase() || filters[key] === '') ;
      }
      return isValid;
    });
  }
  
  static getSortedData (data, sort) {
    const sortOptions = sort.split(':');
    const field = sortOptions[0];
    const direction = sortOptions[1];
    if (direction==='DESC') {
      return data.sort((a, b) => (a[field] > b[field]) ? -1 : 1)
    }
    return data.sort((a, b) => (a[field] > b[field]) ? 1 : -1)
  }

  static getPaginatedData(limit, page, data) {
    
    return data.slice(limit * (page - 1), limit * page)
  }

  static getList(req, res) {
    let data = CustomerController.getData()
    let query = req.query.filter
    if (query && query !== '') {
      data = CustomerController.getSearchData(data, query)
    }
    res.send(data);
  };

  static getCustomers (req, res) {
    let data = CustomerController.getData()
    let {sort, limit, page,  ...filters}  = req.query
    // .filter(filter => Object.key(filter) !== 'sort')
    // const sort = req.query.sort
    if (filters && Object.keys(filters).length >0) {
      data = CustomerController.getFilteredData(data, filters)
    }
    if (sort && sort !== '' && data) {
      data = CustomerController.getSortedData(data, sort)
    }
    if (limit && limit !== '') {
      page = parseInt(page) || 1
      data = CustomerController.getPaginatedData(parseInt(limit), page, data)
    }
    res.send(data)
  }
}

module.exports = CustomerController;