function setMetaThemeColor(setting){
  const metaThemeColor = document.getElementById('theme-color-meta');

  if (metaThemeColor) {

    switch (setting) {
      case 'dark':
        metaThemeColor.setAttribute('content', '#000000');
        break;
      case 'light':
        metaThemeColor.setAttribute('content', '#ffffff');
        break;
        case 'system':
          window.matchMedia('(prefers-color-scheme: dark)').matches ? metaThemeColor.setAttribute('content', '#000000') : metaThemeColor.setAttribute('content', '#ffffff');
          break;
      default:
         metaThemeColor.setAttribute('content', '#ffffff');
        break;
  }
  }
}

function updateTheme() {
  const theme = ['light', 'dark', 'system'];
  const currentTheme = localStorage.getItem('current-theme') || 'system';
  theme.forEach(t => {
    document.documentElement.classList.remove(t);
  });

  if(currentTheme === 'system') {
     window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.classList.add('dark') : document.documentElement.classList.add('light');
  }else {
    document.documentElement.classList.add(currentTheme);
  }

  setMetaThemeColor(currentTheme);
}

updateTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (localStorage.getItem('current-theme') === 'system') {
    e.matches ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
    setMetaThemeColor('system');
  }
});