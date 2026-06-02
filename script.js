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
