function highlightMeter(line, meterType) {
  let color = '';
  switch (meterType) {
    case 'Iambic (˘´)':
      color = 'blue';  // Jamb = blå
      break;
    case 'Trochaic (´˘)':
      color = 'red';   // Troké = röd
      break;
    case 'Dactylic (´˘˘)':
      color = 'green'; // Daktyl = grön
      break;
    case 'Anapestic (˘˘´)':
      color = 'purple'; // Anapest = lila
      break;
  }
  return `<span style="color:${color}">${line}</span>`;
}
