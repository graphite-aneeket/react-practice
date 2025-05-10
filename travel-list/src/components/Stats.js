export const Stats = ({ items }) => {
  if (items.length === 0) {
    return (
      <p className="stats">Start adding some items to your packing list 🚀</p>
    );
  }

  const completedTasks = items.reduce(
    (acc, item) => (item.packed ? acc + 1 : acc),
    0
  );
  const percentage = Math.round((completedTasks * 100) / items.length);

  return (
    <footer className="stats">
      <em>
        💼 You have {items.length} items on your list, and you already packed{" "}
        {completedTasks} ({percentage}%)
      </em>
    </footer>
  );
};
