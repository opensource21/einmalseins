import React from 'react';
import FactorConfig from './FactorConfig';

export default function Config({rangeA, rangeB, time, rangeChangeFunc, timeChangeFunc, showHint, setHint}) {
  return (
      <div id="configuration">
            <FactorConfig factorName="A" range = {rangeA} rangeChangeFunc = {rangeChangeFunc} />
            <FactorConfig factorName="B" range = {rangeB} rangeChangeFunc = {rangeChangeFunc} />
            <form className="faktorConfig row form-inline">
                <div className="form-group"> 
                  <label>Zeit für die Lösung</label> 
                  <input className="form-control" type="number" name="time"
                      size = "2" min = "5" max = "60"
                      value= {time} onChange = {event => timeChangeFunc(event.target.value)} />
                  <label>Sekunden</label>
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={showHint}
                        onChange={e => setHint(e.target.checked)}/>Tipps anzeigen
                  </label>
                </div>
            </form>
        </div>
  );
}

Config.propTypes = {
    rangeA: React.PropTypes.shape({
        from: React.PropTypes.number.isRequired,
        to: React.PropTypes.number.isRequired
      }),
    rangeB: React.PropTypes.shape({
        from: React.PropTypes.number.isRequired,
        to: React.PropTypes.number.isRequired
      }),
    time: React.PropTypes.number.isRequired,
    rangeChangeFunc: React.PropTypes.func.isRequired,
    timeChangeFunc: React.PropTypes.func.isRequired,
    showHint: React.PropTypes.bool.isRequired,
    setHint: React.PropTypes.func.isRequired
  };
