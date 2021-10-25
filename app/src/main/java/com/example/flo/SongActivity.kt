package com.example.flo

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.os.PersistableBundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityMainBinding
import com.example.flo.databinding.ActivitySongBinding

class SongActivity : AppCompatActivity() { // : extends라는 뜻
    lateinit var binding : ActivitySongBinding
    var isPlay : Boolean=false;
    private var song = Song()
    private lateinit var player:Player
    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // binding 초기화
        binding = ActivitySongBinding.inflate(layoutInflater);
        // root-> 최상단 뷰
        setContentView(binding.root)
        initSong()
        // player 객체 생성 및 시작
        player = Player(song.playTime,song.isPlaying)
        player.start()
        //player.interrupt()
        binding.songArrowDownIb.setOnClickListener{ // mainActivity로 이동
            finish();
        }
        binding.songPlayIv.setOnClickListener{
            player.isPlaying = true
            setPlayerStatus(true)
        }

        binding.songPauseIv.setOnClickListener{
            player.isPlaying = false
            setPlayerStatus(false);
        }
        binding.songRepeatIv.setOnClickListener{
            setPlayRepeat(false)
        }
        binding.songRepeatLightIv.setOnClickListener{
            setPlayRepeat(true)
        }
        binding.songRandomIv.setOnClickListener{
            setPlayRandom(false)
        }
        binding.songRandomLightIv.setOnClickListener {
            setPlayRandom(true)
        }
    }

    private fun initSong(){
        if(intent.hasExtra("title") && intent.hasExtra("singer")
            && intent.hasExtra("playTime") && intent.hasExtra("isPlaying")){
            song.title = intent.getStringExtra("title").toString() !!
            song.singer= intent.getStringExtra("singer").toString() !!
            song.playTime = intent.getIntExtra("playTime",0)
            song.isPlaying=intent.getBooleanExtra("isPlaying",false)

            binding.songPlayFinishTv.text = String.format("%02d:%02d", song.playTime/60, song.playTime%60)
            binding.songTitleTv.text = song.title
            binding.songSingerTv.text= song.singer

            Toast.makeText(this,song.isPlaying.toString(),Toast.LENGTH_SHORT).show()
            setPlayerStatus(song.isPlaying)
        }
    }

    fun setPlayerStatus (isPlaying : Boolean){
        if(isPlaying){
            binding.songPlayIv.visibility = View.GONE;
            binding.songPauseIv.visibility = View.VISIBLE;
        }else{
            binding.songPlayIv.visibility = View.VISIBLE;
            binding.songPauseIv.visibility = View.GONE;
        }
    }

    private fun setPlayRandom(isRandom: Boolean) {
        if(isRandom){
            binding.songRandomIv.visibility=View.VISIBLE;
            binding.songRandomLightIv.visibility=View.GONE;
        }else{
            binding.songRandomIv.visibility=View.GONE;
            binding.songRandomLightIv.visibility=View.VISIBLE;
        }
    }

    private fun setPlayRepeat(isRepeat: Boolean) {
        if(isRepeat){
            binding.songRepeatIv.visibility=View.VISIBLE;
            binding.songRepeatLightIv.visibility=View.GONE;
        }else{
            binding.songRepeatIv.visibility=View.GONE;
            binding.songRepeatLightIv.visibility=View.VISIBLE;
        }
    }

    //내부 클래스로 돼서 위에 있는 변수 사용가능
    inner class Player(private val playTime:Int, var isPlaying: Boolean):Thread(){
        private var second = 0;
        override fun run(){
            while (true) {
                if(second >= playTime) {
                    break
                }
                if(isPlaying){
                    sleep(1000) //1초마다
                    second++; // 1씩 더해짐
                    // worketthread는 렌더링에 간섭할수 없다..!
                    // 따라서 handler가 필요함
                    // 또는 runOnUiThread
                    handler.post{
                        binding.songStatusV.progress = second*1000/playTime
                        // 무조건 2자리수로 나타내는데 한자리수라면 앞에 0을 넣어준다.
                        binding.songPlayStartTv.text = String.format("%02d:%02d",second/60,second%60)
                    }
                }

            }
        }

    }

}