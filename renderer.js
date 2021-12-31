console.log(window.myAPI)
payload()
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})
  
document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})

// dark mode
async function testIt() {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    document.getElementById('device-name').innerHTML = device.name || `ID: ${device.id}`
} 
document.getElementById('clickme').addEventListener('click',testIt)

function payload() {
    console.log('111')
}