
import React from "react";
import NodeBase from "./nodebase";
import { NODE_DEFINITIONS } from "./nodedef";

export default function NodeFactory({ type, data, id }) {
  const nodeDef = NODE_DEFINITIONS[type];
  if (!nodeDef)
    return (
      <NodeBase title="Unknown Node" description={`Type: ${type}`} color="#ff0000" />
    );

  return (
    <NodeBase
      title={nodeDef.title}
      description={nodeDef.description}
      color={nodeDef.color}
      data={data}
      id={id}
    />
  );
}

