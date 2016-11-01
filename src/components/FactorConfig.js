import React from 'react';

export default function FactorConfig({factorName, range, rangeChangeFunc}) {
    return (
    <div className="faktorConfig row form-inline form-group"> 
      <label>Faktor {factorName} von</label> 
      <input className="form-control" type="number" name="from" value = {range.from}
            size = "2" min = "2" max = "30" 
            onChange={event => 
                rangeChangeFunc(factorName, event.target.name, event.target.value)}></input> 
      <label>bis</label> 
      <input className="form-control" type="number" name="to" value = {range.to}
            size = "2" min = "2" max = "30"
            onChange={event => 
                rangeChangeFunc(factorName, event.target.name, event.target.value)}/>.
    </div>)
}

FactorConfig.propTypes = {
    factorName: React.PropTypes.string.isRequired,
    range: React.PropTypes.shape({
        from: React.PropTypes.number.isRequired,
        to: React.PropTypes.number.isRequired
    }).isRequired, 
    rangeChangeFunc: React.PropTypes.func.isRequired
}