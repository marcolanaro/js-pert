import React, { Component } from 'react';
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphArrowLink,
} from 'react-vis-force';
import jsPERT, { pertProbability, START, END, Pert } from 'js-pert';

import activities from './activities.json';

const pert = jsPERT(activities);

const getFillColor = (nodeKey: string, pert: Pert) => {
  if (nodeKey === START || nodeKey === END) {
    return 'blue';
  }
  return pert.criticalPath.indexOf(nodeKey) > -1 ? 'red' : 'green';
};

interface ComponentProps {}
interface StateProps {
  selected?: string;
}

class App extends Component<ComponentProps, StateProps> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { selected: undefined };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(nodeKey?: string) {
    this.setState({ selected: nodeKey });
  }

  renderSelected() {
    if (!this.state.selected || !pert.activitiesParams[this.state.selected]) {
      return null;
    }
    return (
      <div style={{ float: 'right' }}>
        Selected node: {this.state.selected}
        <br />
        Expected Time: {pert.activitiesParams[this.state.selected].expectedTime}
        <br />
        Slack: {pert.slack[this.state.selected]}
        <br />
        <br />
        Earliest Start: {pert.earliestStartTimes[this.state.selected]}
        <br />
        Earliest Finish: {pert.earliestFinishTimes[this.state.selected]}
        <br />
        <br />
        Latest Start: {pert.latestStartTimes[this.state.selected]}
        <br />
        Latest Finish: {pert.latestFinishTimes[this.state.selected]}
        <br />
      </div>
    );
  }

  render() {
    return (
      <div>
        <p>Probability to complete in 19 days: {pertProbability(pert, 19)}</p>
        Click on the node for details
        {this.renderSelected()}
        <div>
          <InteractiveForceGraph
            zoom
            onDeselectNode={() => this.handleSelect()}
            onSelectNode={(event: any, node: any) => this.handleSelect(node.id)}
            simulationOptions={{
              height: 800,
              width: 800,
              strength: { collide: 127, charge: 5 },
            }}
          >
            {Object.keys(pert.network).map(nodeKey => (
              <ForceGraphNode
                node={{ id: nodeKey, radius: 10 }}
                fill={getFillColor(nodeKey, pert)}
                showLabel
                key={`node|${nodeKey}`}
              />
            ))}
            {Object.keys(pert.network).map(nodeKey =>
              pert.network[nodeKey].successors.map(successorKey => (
                <ForceGraphArrowLink
                  link={{ source: nodeKey, target: successorKey }}
                  targetRadius={5}
                  key={`arrow|${nodeKey}=>${successorKey}`}
                />
              ))
            )}
          </InteractiveForceGraph>
        </div>
      </div>
    );
  }
}

export default App;
