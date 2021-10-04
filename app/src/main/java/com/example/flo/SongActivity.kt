package com.example.flo

import android.os.Bundle
import android.os.PersistableBundle
import android.view.LayoutInflater
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityMainBinding
import com.example.flo.databinding.ActivitySongBinding

class SongActivity : AppCompatActivity() { // : extends라는 뜻
    lateinit var binding : ActivitySongBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // binding 초기화
        binding = ActivitySongBinding.inflate(layoutInflater);
        // root-> 최상단 뷰
        setContentView(binding.root)

        if(intent.hasExtra("title") && intent.hasExtra("singer")){
            binding.songTitleTv.text = intent.getStringExtra("title")
            binding.songSingerTv.text = intent.getStringExtra("singer")
        }

        binding.songArrowDownIb.setOnClickListener{ // mainActivity로 이동
            finish();
        }
        binding.songPlayIv.setOnClickListener{
            setPlayerStatus(false);
        }

        binding.songPauseIv.setOnClickListener{
            setPlayerStatus(true);
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

    fun setPlayerStatus (isPlaying : Boolean){
        if(isPlaying){
            binding.songPlayIv.visibility = View.VISIBLE;
            binding.songPauseIv.visibility = View.GONE;
        }else{
            binding.songPlayIv.visibility = View.GONE;
            binding.songPauseIv.visibility = View.VISIBLE;
        }
    }

}