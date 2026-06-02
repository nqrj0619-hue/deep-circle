window.addEventListener('error', function (e ) {
        if (e.target.tagName.toLowerCase() === 'img') {
            const img = e.target;
            
            // 1. 從標籤的 data-fallback 屬性中抓取專屬備援網址
            const specificBackup = img.getAttribute('data-fallback');
            
            // 2. 如果有設定專屬備援，且還沒換過
            if (specificBackup && img.src !== specificBackup) {
                console.log("偵測到損壞，正在切換至專屬備援:", specificBackup);
                img.src = specificBackup;
            } 
            // 3. (可選) 如果沒設定專屬備援，也可以給一個全域通用的預設圖
            else if (img.src !== "https://placehold.jp/24/cccccc/ffffff/200x200.png?text=圖片載入失敗" ) {
                img.src = "https://placehold.jp/24/cccccc/ffffff/200x200.png?text=圖片載入失敗";
            }
            
            // 防止無限循環
            img.onerror = null;
        }
    }, true );

    async function loadEvents() {
    try {
        // 抓取 events.txt，加上時間戳記避免瀏覽器快取舊資料
        const response = await fetch('events.txt?t=' + new Date().getTime());
        if (!response.ok) throw new Error('找不到活動檔案');
        const data = await response.text();
        // 將讀取到的文字放入網頁中
        document.getElementById('event-list').textContent = data;
    } catch (error) {
        console.error('讀取失敗:', error);
        document.getElementById('event-list').textContent = '暫時無法載入活動資訊。';
    }
}

// 網頁載入完成後執行
window.addEventListener('DOMContentLoaded', loadEvents);