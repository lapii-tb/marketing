function initCountdown() {
  const targetDate = new Date('June 11, 2026 00:00:00').getTime();
  
  const elements = {
    days: document.querySelector('.days .counter'),
    hours: document.querySelector('.hours .counter'),
    minutes: document.querySelector('.minutes .counter'),
    seconds: document.querySelector('.seconds .counter')
  };

  const formatTime = (value) => value < 10 ? '0' + value : value.toString();
  const updateDisplay = (timeValues) => {
    Object.keys(elements).forEach(key => {
      if (elements[key]) {
        elements[key].textContent = timeValues[key];
      }
    });
  };
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance > 0) {
      const timeValues = {
        days: formatTime(Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: formatTime(Math.floor((distance % (1000 * 60)) / 1000))
      };
      
      updateDisplay(timeValues);
    } else {
      updateDisplay({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    }
  }

  updateCountdown();
  if (targetDate > new Date().getTime()) {
    setInterval(updateCountdown, 1000);
  }
}

document.addEventListener('DOMContentLoaded', initCountdown);