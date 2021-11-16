package com.example.flo

import android.annotation.SuppressLint
import android.media.MediaPlayer
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivitySongBinding
import java.util.concurrent.TimeUnit

class SongActivity : AppCompatActivity() {
    lateinit var binding: ActivitySongBinding

    //dlrj
    // 미디어 플레이어
    private var mediaPlayer: MediaPlayer? = null
    lateinit var timer: Timer

    private var songs = ArrayList<Song>()
    private var nowPos = 0
    private lateinit var songDB: SongDatabase


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySongBinding.inflate(layoutInflater)
        setContentView(binding.root)

        initPlayList()
        initSong()
        initClickListener()
    }

    override fun onPause() {
        super.onPause()

        songs[nowPos].second = (songs[nowPos].playTime * binding.musicplayerProgressSb.progress) / 1000
        songs[nowPos].isPlaying = false
        setPlayerStatus(false)

        val sharedPreferences = getSharedPreferences("song", MODE_PRIVATE)
        val editor = sharedPreferences.edit()

        editor.putInt("songId", songs[nowPos].id)
        editor.apply()
    }

    // 앱이 종료될 때 리소스 해제
    override fun onDestroy() {
        super.onDestroy()


        timer.interrupt() // 스레드를 해제함
        mediaPlayer?.release() // 미디어플레이어가 가지고 있던 리소스를 해방
        mediaPlayer = null // 미디어플레이어 해제
    }

    private fun initPlayList(){
        songDB = SongDatabase.getInstance(this)!!
        songs.addAll(songDB.songDao().getSongs())
    }


    private fun startTimer() {
        timer = Timer(songs[nowPos].playTime, songs[nowPos].isPlaying)
        timer.start()
    }

    private fun initSong() {
        val spf = getSharedPreferences("song", MODE_PRIVATE)
        val songId = spf.getInt("songId", 0)

        nowPos = getPlayingSongPosition(songId)

        Log.d("now Song ID",songs[nowPos].id.toString())

        startTimer()
        setPlayer(songs[nowPos])
    }

    private fun getPlayingSongPosition(songId: Int): Int{
        for (i in 0 until songs.size){
            if (songs[i].id == songId){
                return i
            }
        }
        return 0
    }

    private fun setPlayer(song: Song) {
        val music = resources.getIdentifier(song.music, "raw", this.packageName)

        binding.songMusicTitleTv.text = song.title
        binding.songSingerNameTv.text = song.singer
        binding.songStartTimeTv.text =
            String.format("%02d:%02d", song.second / 60, song.second % 60)
        binding.songEndTimeTv.text =
            String.format("%02d:%02d", song.playTime / 60, song.playTime % 60)
        binding.songAlbumIv.setImageResource(song.coverImg!!)
        binding.musicplayerProgressSb.progress = (song.second * 1000 / song.playTime)

        setPlayerStatus(song.isPlaying)

        if (song.isLike) {
            binding.songLikeIv.setImageResource(R.drawable.ic_my_like_on)
        } else {
            binding.songLikeIv.setImageResource(R.drawable.ic_my_like_off)
        }

        mediaPlayer = MediaPlayer.create(this, music)
    }

    private fun initClickListener() {
        binding.songDownIb.setOnClickListener {
            finish()
        }

        binding.songMiniplayerIv.setOnClickListener {
            setPlayerStatus(true)
        }

        binding.songPauseIv.setOnClickListener {
            setPlayerStatus(false)
        }

        binding.songPreviousIv.setOnClickListener {
            moveSong(-1)
        }

        binding.songNextIv.setOnClickListener {
            moveSong(+1)
        }

        binding.songLikeIv.setOnClickListener {
            setLike(songs[nowPos].isLike)
        }

    }
    private fun moveSong(direct: Int){

        if (nowPos + direct < 0){
            Toast.makeText(this,"first song",Toast.LENGTH_SHORT).show()
            return
        }
        if (nowPos + direct >= songs.size){
            Toast.makeText(this,"last song",Toast.LENGTH_SHORT).show()
            return
        }

        nowPos += direct

        timer.interrupt()
        startTimer()

        mediaPlayer?.release() // 미디어플레이어가 가지고 있던 리소스를 해방
        mediaPlayer = null // 미디어플레이어 해제

        setPlayer(songs[nowPos])
    }
    private fun setLike(isLike: Boolean){
        songs[nowPos].isLike = !isLike
        songDB.songDao().updateIsLikeById(!isLike,songs[nowPos].id)

        if (isLike){
            binding.songLikeIv.setImageResource(R.drawable.ic_my_like_off)
        }else{
            binding.songLikeIv.setImageResource(R.drawable.ic_my_like_on)
        }
    }




    private fun setPlayerStatus(isPlaying: Boolean) {
        timer.isPlaying = isPlaying
        songs[nowPos].isPlaying = isPlaying

        if (isPlaying) {
            binding.songMiniplayerIv.visibility = View.GONE
            binding.songPauseIv.visibility = View.VISIBLE

            mediaPlayer?.start()
        } else {
            binding.songMiniplayerIv.visibility = View.VISIBLE
            binding.songPauseIv.visibility = View.GONE

            mediaPlayer?.pause()
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
                            binding.musicplayerProgressSb.progress =
                                (second * 1000 / playTime).toInt()
                            binding.songStartTimeTv.text = String.format(
                                "%02d:%02d",
                                TimeUnit.SECONDS.toMinutes(second),
                                second % 60
                            )
                        }
                    }
                }
            } catch (e: InterruptedException) {
                Log.d("SONG", "쓰레드가 죽었습니다. ${e.message}")
            }
        }
    }
}