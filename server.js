const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// .envファイルの設定読み込み
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

// フロントエンドにMapboxトークンを渡すエンドポイント
// 注意: Mapbox GL JSはクライアントサイドでレンダリングするため、
// 最終的にブラウザのネットワークタブ等でトークンは可視化されますが、
// ソースコードへのハードコーディングを防ぐベストプラクティスです。
app.get('/api/config', (req, res) => {
    if (!process.env.MAPBOX_ACCESS_TOKEN) {
        return res.status(500).json({ error: 'Mapbox Access Token is not set on server.' });
    }
    res.json({
        mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN
    });
});

app.listen(PORT, () => {
    console.log(`
    ==================================================
      DRAGON RADAR NAVIGATION SYSTEM ONLINE
    ==================================================
      Server running at: http://localhost:${PORT}
    ==================================================
    `);
});