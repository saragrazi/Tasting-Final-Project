const formatPrepTime = (minutes) => {
  const total = Number(minutes);
  if (!total) return '';
  if (total < 60) return `${total} דקות`;

  const hours = Math.floor(total / 60);
  const remainder = total % 60;
  const hoursLabel = hours === 1 ? 'שעה' : `${hours} שעות`;

  return remainder ? `${hoursLabel} ו-${remainder} דקות` : hoursLabel;
};

export default formatPrepTime;
