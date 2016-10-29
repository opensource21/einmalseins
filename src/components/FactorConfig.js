import React from 'react';

export default function FactorConfig({factorName, range, onChangeFunc}) {
    return (
    <div className="faktorConfig form-inline form-group"> 
      <label>Faktor A von</label> 
      <input className="form-control" type="number" name="from" value = {range.from}
            onChange={event => 
                onChangeFunc(factorName, event.target.name, event.target.value)}/> 
      <label>bis</label> 
      <input className="form-control" type="number" name="to" value = {range.to}
            onChange={event => 
                onChangeFunc(factorName, event.target.name, event.target.value)}/>.
    </div>
    );
}

FactorConfig.propTypes = {
    factorName: React.PropTypes.string.isRequired,
    range: React.PropTypes.shape({
        from: React.PropTypes.number.isRequired,
        to: React.PropTypes.number.isRequired
    }),
    onChangeFunc: React.PropTypes.func.isRequired
}