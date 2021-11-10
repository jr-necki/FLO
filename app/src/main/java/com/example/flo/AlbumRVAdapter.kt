package com.example.flo

import android.view.LayoutInflater
import android.view.OrientationEventListener
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.flo.databinding.ItemAlbumBinding

class AlbumRVAdapter(private val albumlist : ArrayList<Album>) // data binding
    : RecyclerView.Adapter<AlbumRVAdapter.ViewHolder>() {

    // 클릭 인터페이스 정의
    interface MyItemClickListener{
        fun onItemClick(album: Album)
        fun onRemoveAlbum(position: Int)
    }
    //객체를 저장하는 변수
    private lateinit var mItemClickListener: MyItemClickListener

    // 리스너 객체를 전달받는 함수랑 리스너
    fun setMyItemClickListener(itemClickListener: MyItemClickListener){
        mItemClickListener = itemClickListener
    }


    // 뷰홀더를 생성해줘야할 때 호출되는 함수 => 아이템 뷰 객체를 만들어서 뷰 홀더에 던져줌
    // 몇 번 호출되고 끝
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int):
            AlbumRVAdapter.ViewHolder {
        val binding: ItemAlbumBinding = ItemAlbumBinding.inflate(LayoutInflater
            .from(viewGroup.context),viewGroup,false);

        return ViewHolder(binding) // 뷰 홀더 던져준다.
    }

    fun addItem(album :Album){
        albumlist.add(album)
        // 데이터가 바뀐것을 어댑터에게 알려줘야함.
        notifyDataSetChanged()
    }

    fun removeItem(position: Int){
        albumlist.removeAt(position)
        // 데이터가 바뀐것을 어댑터에게 알려줘야함.
        notifyDataSetChanged()
    }




    // 뷰 홀더에 데이터를 바인딩 할 때마다 호출 => 많이 호출
    override fun onBindViewHolder(holder: AlbumRVAdapter.ViewHolder, position: Int) {
        holder.bind(albumlist[position])
      //  holder.itemView.setOnClickListener { mItemClickListener.onItemClick(albumlist[position]) }
        holder.binding.homeCoverSong2.setOnClickListener {
            mItemClickListener.onRemoveAlbum(position)
        }
    }

    // 데이터 세트 크기를 알려주는 함수 -> 리사이클러뷰가 마지막이 언제인지를 알게 된다.
    override fun getItemCount(): Int = albumlist.size


    //view holder
   inner class ViewHolder(val binding: ItemAlbumBinding): RecyclerView.ViewHolder(binding.root){

        // binding
        fun bind(album:Album){
            binding.homeCoverSong2.text = album.title
            binding.homeCoverSinger2.text = album.singer
            binding.homeCoverIv.setImageResource(album.coverImg!!)
        }
   }


}