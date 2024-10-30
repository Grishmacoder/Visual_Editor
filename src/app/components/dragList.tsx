import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = [...list];
  const removed = result.splice(startIndex, 1)[0];
  result.splice(endIndex, 0, removed);

  const removeLength = removed.end - removed.start;

  if (startIndex < endIndex) {
    let final = 0;
    for (let i = startIndex; i < endIndex; i++) {
      const item = result[i];
      item.start -= removeLength;
      item.end -= removeLength;
      final = item.end;
    }

    const endItem = result[endIndex];
    endItem.start = final;
    endItem.end = final + removeLength;
  }

  if (startIndex > endIndex) {
    const start = result[endIndex + 1].start;
    for (let i = endIndex + 1; i < startIndex + 1; i++) {
      const item = result[i];
      item.start += removeLength;
      item.end += removeLength;
    }
    const endItem = result[endIndex];
    endItem.start = start;
    endItem.end = start + removeLength;
  }

  return result;
};

const getItemStyle = (draggableStyle: any, start: any, end: any) => ({
  width: `${(end - start) * 100}px`,
  ...draggableStyle,
});

const DargList = ({ data }: any) => {
  const [items, setItems] = useState<any>(data);
  const [winReady, setwinReady] = useState(false);

  useEffect(() => {
    setwinReady(true);
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newItems);
  };

  return (
    <div className="my-2">
      {winReady && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                className="flex overflow-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {items.map((item: any, index: any) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="bg-indigo-500 border-2 border-black overflow-auto rounded-lg p-2 "
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          provided.draggableProps.style,
                          item.start,
                          item.end
                        )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default DargList;
