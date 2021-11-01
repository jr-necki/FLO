package com.example.flo

import android.app.Activity
import android.content.ContentValues.TAG
import android.content.Intent
import android.os.*
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.SeekBar
import android.widget.SeekBar.OnSeekBarChangeListener
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityMainBinding
import com.example.flo.databinding.ActivitySongBinding
import android.widget.Toast.makeText as makeText1

class SongActivity : AppCompatActivity() { // : extends라는 뜻
    lateinit var binding : ActivitySongBinding
    var isRepeat : Boolean=false;
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
            val intent = Intent(this, MainActivity::class.java)
            intent.putExtra("title",song.title)
            intent.putExtra("singer",song.singer)
            intent.putExtra("playTime",song.playTime)
            intent.putExtra("isPlaying",song.isPlaying)
            startActivity(intent)
            finish();

        }
        binding.songStatusV.setOnSeekBarChangeListener(object : OnSeekBarChangeListener {
            override fun onProgressChanged(seekBar: SeekBar, progress: Int, fromUser: Boolean) {
                // onProgressChange - Seekbar 값 변경될때마다 호출
                Log.d(
                    TAG,
                    String.format(
                        "onProgressChanged 값 변경 중 : progress [%d] fromUser [%b]",
                        progress,
                        fromUser
                    )
                )

            }

            override fun onStartTrackingTouch(seekBar: SeekBar) {
                // onStartTeackingTouch - SeekBar 값 변경위해 첫 눌림에 호출
                Log.d(
                    TAG,
                    String.format("onStartTrackingTouch 값 변경 시작 : progress [%d]", seekBar.progress)
                )
            }

            override fun onStopTrackingTouch(seekBar: SeekBar) {
                // onStopTrackingTouch - SeekBar 값 변경 끝나고 드래그 떼면 호출
                Log.d(
                    TAG,
                    String.format("onStopTrackingTouch 값 변경 종료: progress [%d]", seekBar.progress)
                )
            }
        })

        binding.songPlayIv.setOnClickListener{
            player.isPlaying = true
            song.isPlaying = true
            setPlayerStatus(true)
        }

        binding.songPauseIv.setOnClickListener{
            player.isPlaying = false
            song.isPlaying = false
            setPlayerStatus(false);
        }
        binding.songRepeatIv.setOnClickListener{
            isRepeat = true
            setPlayRepeat(true)
        }
        binding.songRepeatLightIv.setOnClickListener{
            isRepeat = false
            setPlayRepeat(false)
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
            binding.songRepeatIv.visibility=View.GONE;
            binding.songRepeatLightIv.visibility=View.VISIBLE;
            makeText1(this,isRepeat.toString(),Toast.LENGTH_SHORT).show()
        }else{
            binding.songRepeatIv.visibility=View.VISIBLE;
            binding.songRepeatLightIv.visibility=View.GONE;
            makeText1(this,isRepeat.toString(),Toast.LENGTH_SHORT).show()
        }
    }


    //내부 클래스로 돼서 위에 있는 변수 사용가능
    inner class Player(private val playTime:Int, var isPlaying: Boolean):Thread(){
        private var second = 0;
        @RequiresApi(Build.VERSION_CODES.N)
        override fun run(){
            while (true) {
                if(second >= playTime) {
                    if(isRepeat){
                        binding.songStatusV.progress=0
                        binding.songStatusV.setProgress(0,true)
                        second = 0;
                    }else{
                        break
                    }
                }
                if(isPlaying){
                    sleep(10) //1초마다
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