package com.example.flo

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.flo.databinding.ItemAlbumBinding
import com.example.flo.databinding.ItemLockerSongBinding

class LockerSongAdapter(private val songlist : ArrayList<LockerSong>):
RecyclerView.Adapter<LockerSongAdapter.ViewHolder>(){


    // 뷰홀더를 생성해줘야 할 때 호출되는 함수 => 아이템 뷰 객체를 만들어서 뷰 홀더에 던져줌
    // 몇 번 호출되고 끝
    override fun onCreateViewHolder(
        viewGroup: ViewGroup,
        viewType: Int
    ): LockerSongAdapter.ViewHolder {
        val binding: ItemLockerSongBinding = ItemLockerSongBinding.inflate(LayoutInflater
            .from(viewGroup.context),viewGroup,false)

        return ViewHolder(binding) // 뷰 홀더 던져준다.
    }

    // 뷰 홀더에 데이터를 바인딩 할 때마다 호출 => 많이 호출
    override fun onBindViewHolder(holder: LockerSongAdapter.ViewHolder, position: Int) {
       holder.bind(songlist[position])
        holder.binding.lockerDeleteIv.setOnClickListener {
            //삭제하는 함수
        }
    }

    override fun getItemCount(): Int = songlist.size

    //View Holder
    inner class ViewHolder(val binding: ItemLockerSongBinding) : RecyclerView.ViewHolder(binding.root){
        // binding
        fun bind(lockerSong : LockerSong){
            binding.lockerSongTitleTv.text = lockerSong.title
            binding.lockerSongSingerTv.text = lockerSong.singer
            binding.lockerCoverIv.setImageResource(lockerSong.coverImg!!)
        }
    }

}