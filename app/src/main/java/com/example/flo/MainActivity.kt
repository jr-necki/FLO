package com.example.flo

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
    //gson
    private var gson: Gson = Gson()
    //song
    private var song: Song = Song()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initNavigation()

        //val song = Song(binding.mainMiniPlayerTitleTv.text.toString(),
        //binding.mainMiniPlayerSingerTv.text.toString())

        val song = Song("SICKO MODE","Travis Scott",0,313,false,"music_sickmode")
        setMiniPlayer(song)

        // 작업할 레이아웃과 바인딩
        binding.mainPlayerLayout.setOnClickListener{
            // this여기서 songActivity로 보낸다.
            //startActivity(Intent(this, SongActivity::class.java));
            val intent = Intent(this, SongActivity::class.java)
            intent.putExtra("title",song.title)
            intent.putExtra("singer",song.singer)
            intent.putExtra("second",song.second)
            intent.putExtra("playTime",song.playTime)
            intent.putExtra("isPlaying",song.isPlaying)
            intent.putExtra("music",song.music)
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

    private fun initNavigation() {
        supportFragmentManager.beginTransaction().replace(R.id.main_frm, HomeFragment())
            .commitAllowingStateLoss()

    }

    private fun setMiniPlayer(song: Song) {
        binding.mainMiniPlayerTitleTv.text = song.title
        binding.mainMiniPlayerSingerTv.text=song.singer
        binding.mainProgressSb.progress = song.second*1000/song.playTime
       // mediaPlayer =MediaPlayer.create(this,song.music)

        if(intent.hasExtra("isPlaying")){
            song.isPlaying = intent.getBooleanExtra("isPlaying",true);
            if(song.isPlaying){ // 재생중이라면
                binding.mainPauseBtn.visibility = View.VISIBLE;
                binding.mainMiniplayerBtn.visibility = View.GONE;
            }else{ // 재생중이 아니라면
                binding.mainPauseBtn.visibility = View.GONE;
                binding.mainMiniplayerBtn.visibility = View.VISIBLE;
            }
        }
    }


    override fun onStart(){
        super.onStart()
        val sharedPreferences = getSharedPreferences("song", MODE_PRIVATE) // 이 앱에서만 SharedPreference에 접근가능
        val jsonSong = sharedPreferences.getString("song",null)
        //json을 객체로
        song = if(jsonSong == null){
            Song("SICKO MODE","Travis Scott",0,313,false,"music_sickmode")
        }else{
            gson.fromJson(jsonSong,Song::class.java)
        }
        setMiniPlayer(song)

    }

}

