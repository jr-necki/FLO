package com.example.flo

import android.annotation.SuppressLint
import android.content.Intent
import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityMainBinding
import com.google.gson.Gson


class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    private lateinit var song: Song


    // 미디어 플레이어
    private var mediaPlayer: MediaPlayer? = null
    lateinit var timer: MainActivity.Timer

    private var songs = ArrayList<Song>()
    private var nowPos = 0
    private lateinit var songDB: SongDatabase

    // Gson
    private val gson: Gson = Gson()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        songDB =  SongDatabase.getInstance(this)!! // 초기화
        songs.addAll(songDB.songDao().getSongs())

        initNavigation()
        inputDummyAlbums()
        inputDummySongs()
        initClickListener()

        binding.mainPlayerLayout.setOnClickListener {
            Log.d("nowSongId", song.id.toString())
            Log.d("nowSongTitle",song.title)

            val editor = getSharedPreferences("song", MODE_PRIVATE).edit()
            editor.putInt("songId", songs[nowPos].id)
            editor.apply()

            val intent = Intent(this@MainActivity, SongActivity::class.java)

            startActivity(intent)
        }
    }

    private fun initClickListener() {
        binding.mainMiniplayerPlayIv.setOnClickListener {
            // 노래 재생
            setPlayerStatus(true)
        }

        binding.mainMiniplayerPauseIv.setOnClickListener {
            // 노래 정지
            setPlayerStatus(false)
        }

        binding.mainMiniplayerPreviousIv.setOnClickListener {
            // 이전 곡
            moveSong(-1)
        }

        binding.mainMiniplayerNextIv.setOnClickListener {
            // 다음 곡
            moveSong(+1)
        }


    }

    private fun moveSong(direct: Int) {
        if (nowPos + direct < 0){
            Toast.makeText(this,"first song",Toast.LENGTH_SHORT).show()
            return
        }
        if (nowPos + direct >= songs.size){
            Toast.makeText(this,"last song",Toast.LENGTH_SHORT).show()
            return
        }
        nowPos+=direct
        timer.interrupt()
        startTimer(songs[nowPos])

        mediaPlayer?.release()
        mediaPlayer = null
        setMiniPlayer(songs[nowPos])

    }

    private fun startTimer(nowPos: Song) {
        timer = Timer(song.playTime, song.isPlaying)
        timer.start()
    }

    private fun setPlayerStatus(isPlaying: Boolean) {
        timer.isPlaying = isPlaying
        songs[nowPos].isPlaying = isPlaying

        if(isPlaying){
            binding.mainMiniplayerPlayIv.visibility = View.GONE
            binding.mainMiniplayerPauseIv.visibility = View.VISIBLE

            mediaPlayer?.start()
        }else{
            binding.mainMiniplayerPlayIv.visibility = View.VISIBLE
            binding.mainMiniplayerPauseIv.visibility = View.GONE

            mediaPlayer?.pause()
        }
    }

    override fun onStart() {
        super.onStart()

        val spf = getSharedPreferences("song", MODE_PRIVATE)
        val songId = spf.getInt("songId", 0) //sharedPreference

        val songDB = SongDatabase.getInstance(this)!!
        song = if (songId == 0) {
            songDB.songDao().getSong(1)
        } else {
            songDB.songDao().getSong(songId)
        }


        Log.d("song ID", song.id.toString())
        setMiniPlayer(song)
    }

    private fun initNavigation() { // bottom navigation
        supportFragmentManager.beginTransaction().replace(R.id.main_frm, HomeFragment())
            .commitAllowingStateLoss()

        binding.mainBnv.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.homeFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, HomeFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

                R.id.lookFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, LookFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

                R.id.searchFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, SearchFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

                R.id.lockerFragment -> {
                    supportFragmentManager.beginTransaction()
                        .replace(R.id.main_frm, LockerFragment())
                        .commitAllowingStateLoss()
                    return@setOnItemSelectedListener true
                }

            }
            false
        }
    }

    private fun setMiniPlayer(song: Song) {

        binding.mainMiniplayerTitleTv.text = song.title
        binding.mainMiniplayerSingerTv.text = song.singer
        binding.mainProgressSb.progress = (song.second * 1000 / song.playTime)

        timer = Timer(song.playTime,song.isPlaying)
        timer.start()

        val music = resources.getIdentifier(song.music, "raw", this.packageName)

        mediaPlayer = MediaPlayer.create(this, music)

        if (song.isPlaying) {
            binding.mainMiniplayerPauseIv.visibility = View.VISIBLE
            binding.mainMiniplayerPlayIv.visibility = View.GONE
        } else {
            binding.mainMiniplayerPauseIv.visibility = View.GONE
            binding.mainMiniplayerPlayIv.visibility = View.VISIBLE
        }
    }

    inner class Timer(private val playTime: Int = 0, var isPlaying: Boolean = false) : Thread() {
        private var second: Long = 0

        @SuppressLint("SetTextI18n")
        override fun run() {
            try {
                while (true) {
                    if (second >= playTime) {
                        break
                    }

                    if (isPlaying) {
                        sleep(1000)
                        second++

                        runOnUiThread {
//                            binding.musicplayerProgressSb.progress =
//                                (second * 1000 / playTime).toInt()
//                            binding.songStartTimeTv.text = String.format(
//                                "%02d:%02d",
//                                TimeUnit.SECONDS.toMinutes(second),
//                                second % 60
//                            )
                        }
                    }
                }
            } catch (e: InterruptedException) {
                Log.d("SONG", "쓰레드가 죽었습니다. ${e.message}")
            }
        }
    }

    //ROOM_DB
    private fun inputDummyAlbums() {
        val songDB = SongDatabase.getInstance(this)!! // this 액티비티로부터 instance 얻어옴
        val albums = songDB.albumDao().getAlbums() // 모든 데이터 담음

        if (albums.isNotEmpty()) return // 이미 더미데이터를 넣었다면 넘어가기

        songDB.albumDao().insert(
            Album(
                1,
                "IU 5th Album 'LILAC'", "아이유 (IU)", R.drawable.img_album_exp2
            )
        )

        songDB.albumDao().insert(
            Album(
                2,
                "Butter", "방탄소년단 (BTS)", R.drawable.img_album_exp
            )
        )

        songDB.albumDao().insert(
            Album(
                3,
                "iScreaM Vol.10 : Next Level Remixes", "에스파 (AESPA)", R.drawable.img_album_exp3
            )
        )

        songDB.albumDao().insert(
            Album(
                4,
                "MAP OF THE SOUL : PERSONA", "방탄소년단 (BTS)", R.drawable.img_album_exp4
            )
        )

        songDB.albumDao().insert(
            Album(
                5,
                "GREAT!", "모모랜드 (MOMOLAND)", R.drawable.img_album_exp5
            )
        )


    }

    //ROOM_DB
    private fun inputDummySongs() {
        val songDB = SongDatabase.getInstance(this)!!
        val songs = songDB.songDao().getSongs()

        if (songs.isNotEmpty()) return

        songDB.songDao().insert(
            Song(
                "Lilac",
                "아이유 (IU)",
                0,
                200,
                false,
                "music_lilac",
                R.drawable.img_album_exp2,
                false,
                1
            )
        )

        songDB.songDao().insert(
            Song(
                "Flu",
                "아이유 (IU)",
                0,
                200,
                false,
                "music_lilac",
                R.drawable.img_album_exp2,
                false,
                1
            )
        )

        songDB.songDao().insert(
            Song(
                "Butter",
                "방탄소년단 (BTS)",
                0,
                190,
                false,
                "music_lilac",
                R.drawable.img_album_exp,
                false,
                2
            )
        )

        songDB.songDao().insert(
            Song(
                "Butter (Hotter Remix)",
                "방탄소년단 (BTS)",
                0,
                190,
                false,
                "music_lilac",
                R.drawable.img_album_exp,
                false,
                2
            )
        )

        songDB.songDao().insert(
            Song(
                "Butter (Sweeter Remix)",
                "방탄소년단 (BTS)",
                0,
                190,
                false,
                "music_lilac",
                R.drawable.img_album_exp,
                false,
                2
            )
        )

        songDB.songDao().insert(
            Song(
                "Next Level",
                "에스파 (AESPA)",
                0,
                210,
                false,
                "music_lilac",
                R.drawable.img_album_exp3,
                false,
                3
            )
        )

        songDB.songDao().insert(
            Song(
                "Next Level (IMLAY Remix)",
                "에스파 (AESPA)",
                0,
                210,
                false,
                "music_lilac",
                R.drawable.img_album_exp3,
                false,
                3
            )
        )

        songDB.songDao().insert(
            Song(
                "Boy with Luv",
                "방탄소년단 (BTS)",
                0,
                230,
                false,
                "music_lilac",
                R.drawable.img_album_exp4,
                false,
                4
            )
        )

        songDB.songDao().insert(
            Song(
                "소우주 (Mikrokosmos)",
                "방탄소년단 (BTS)",
                0,
                230,
                false,
                "music_lilac",
                R.drawable.img_album_exp4,
                false,
                4
            )
        )

        songDB.songDao().insert(
            Song(
                "Make It Right",
                "방탄소년단 (BTS)",
                0,
                230,
                false,
                "music_lilac",
                R.drawable.img_album_exp4,
                false,
                4
            )
        )

        songDB.songDao().insert(
            Song(
                "BBoom BBoom",
                "모모랜드 (MOMOLAND)",
                0,
                240,
                false,
                "music_lilac",
                R.drawable.img_album_exp5,
                false,
                5
            )
        )

        songDB.songDao().insert(
            Song(
                "궁금해",
                "모모랜드 (MOMOLAND)",
                0,
                240,
                false,
                "music_lilac",
                R.drawable.img_album_exp5,
                false,
                5
            )
        )


        val _songs = songDB.songDao().getSongs()
        Log.d("DB DATA", _songs.toString())

    }
}

