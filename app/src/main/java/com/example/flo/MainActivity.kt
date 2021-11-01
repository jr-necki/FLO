package com.example.flo

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityMainBinding


class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initNavigation()

        //val song = Song(binding.mainMiniPlayerTitleTv.text.toString(),
        //binding.mainMiniPlayerSingerTv.text.toString())

        val song = Song("라일락","아이유",215,false)
        setMiniPlayer(song)

        // 작업할 레이아웃과 바인딩
        binding.mainPlayerLayout.setOnClickListener{
            // this여기서 songActivity로 보낸다.
            //startActivity(Intent(this, SongActivity::class.java));
            val intent = Intent(this, SongActivity::class.java)
            intent.putExtra("title",song.title)
            intent.putExtra("singer",song.singer)
            intent.putExtra("playTime",song.playTime)
            intent.putExtra("isPlaying",song.isPlaying)
            startActivity(intent)
        }

        binding.mainMiniplayerBtn.setOnClickListener {
            binding.mainMiniplayerBtn.visibility = View.GONE;
            binding.mainPauseBtn.visibility = View.VISIBLE;
            song.isPlaying=true
        }
        binding.mainPauseBtn.setOnClickListener {
            binding.mainMiniplayerBtn.visibility = View.VISIBLE;
            binding.mainPauseBtn.visibility = View.GONE;
            song.isPlaying=false
        }

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
        binding.mainMiniPlayerTitleTv.text = song.title
        binding.mainMiniPlayerSingerTv.text=song.singer
        if(intent.hasExtra("isPlaying")){
            song.isPlaying = intent.getBooleanExtra("isPlaying",true);
            if(song.isPlaying){ // 재생중이라면
                binding.mainPauseBtn.visibility = View.VISIBLE;
                binding.mainMiniplayerBtn.visibility = View.GONE;
            }else{ // 재생중이 아니라면
                binding.mainPauseBtn.visibility = View.GONE;
                binding.mainMiniplayerBtn.visibility = View.VISIBLE;
            }
        }else{
            Toast.makeText(this,"intent없음",Toast.LENGTH_SHORT).show()
        }
    }

    private fun initNavigation() {
        supportFragmentManager.beginTransaction().replace(R.id.main_frm, HomeFragment())
            .commitAllowingStateLoss()

    }

}

